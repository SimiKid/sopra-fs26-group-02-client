import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { AttackId } from "@/constants/attacks.constants";
import type { AttackMessage, BattleStateDTO } from "@/types/battle";

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
      const client = new Client({
        webSocketFactory: () => new SockJS(url),
        connectHeaders: { Authorization: this.token },
        reconnectDelay: 5000,
        heartbeatIncoming: 10_000,
        heartbeatOutgoing: 10_000,
        onConnect: () => {
          client.subscribe(`/topic/game/${gameCode}`, (frame) => {
            try {
              onState(JSON.parse(frame.body) as BattleStateDTO);
            } catch (e) {
              onError?.(`Invalid broadcast payload: ${String(e)}`);
            }
          });
          resolve();
        },
        onStompError: (frame) => {
          const msg = frame.headers["message"] ?? "STOMP error";
          onError?.(msg);
          reject(new Error(msg));
        },
        onWebSocketError: () => {
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
    const body: AttackMessage = { attackName };
    this.client.publish({
      destination: `/app/game/${gameCode}/attack`,
      headers: { Authorization: this.token },
      body: JSON.stringify(body),
    });
  }

  disconnect(): void {
    this.client?.deactivate();
    this.client = null;
  }

  get connected(): boolean {
    return this.client?.connected ?? false;
  }
}
