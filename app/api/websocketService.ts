import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";

const DEFAULT_WS_URL = "http://localhost:8080/ws";

export class WebSocketService {
  private client: Client | null = null;

  constructor(private readonly token: string) {}

  connect(
    gameCode: string,
    onState: (state: BattleStateDTO) => void,
    onError?: (message: string) => void,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const url = process.env.NEXT_PUBLIC_WS_URL ?? DEFAULT_WS_URL;
      console.log("[WebSocketService] connecting to", url, "for game", gameCode);

      const client = new Client({
        webSocketFactory: () => new SockJS(url),
        connectHeaders: { Authorization: this.token },
        reconnectDelay: 5000,
        heartbeatIncoming: 10_000,
        heartbeatOutgoing: 10_000,
        onConnect: () => {
          console.log("[WebSocketService] WS CONNECTED for game", gameCode);
          client.subscribe(`/topic/game/${gameCode}`, (frame) => {
            console.log("[WebSocketService] WS MESSAGE RECEIVED:", frame.body);
            try {
              onState(JSON.parse(frame.body) as BattleStateDTO);
            } catch (e) {
              console.error("[WebSocketService] invalid payload", e);
              onError?.(`Invalid broadcast payload: ${String(e)}`);
            }
          });
          console.log("[WebSocketService] subscribed to", `/topic/game/${gameCode}`);
          resolve();
        },
        onStompError: (frame) => {
          console.error("[WebSocketService] STOMP ERROR", frame);
          const msg = frame.headers["message"] ?? "STOMP error";
          onError?.(msg);
          reject(new Error(msg));
        },
        onWebSocketError: (event) => {
          console.error("[WebSocketService] WEBSOCKET ERROR", event);
          onError?.("WebSocket connection error");
          reject(new Error("WebSocket connection error"));
        },
      });
      this.client = client;
      client.activate();
    });
  }

  sendAttack(gameCode: string, attackName: AttackId): void {
    if (!this.client?.connected) {
      throw new Error("WebSocket not connected");
    }
    console.log("[WebSocketService] sending attack", attackName, "to game", gameCode);

    this.client.publish({
      destination: `/app/game/${gameCode}/attack`,
      headers: { Authorization: this.token },
      body: attackName,
    });
  }

  disconnect(): void {
    console.log("[WebSocketService] disconnecting");
    this.client?.deactivate();
    this.client = null;
  }

  get connected(): boolean {
    return this.client?.connected ?? false;
  }
}
