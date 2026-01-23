import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { TransactionEvent } from '../types';

const SOCKET_URL = 'http://localhost:8080/ws/transactions';

class WebSocketService {
    private client: Client;
    private onMessageCallback: ((message: TransactionEvent) => void) | null = null;

    constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS(SOCKET_URL),
            reconnectDelay: 5000,
            debug: (str) => {
                console.log(str);
            },
        });

        this.client.onConnect = () => {
            console.log('Connected to WebSocket');
            this.client.subscribe('/topic/transactions', (message) => {
                if (this.onMessageCallback) {
                    const event: TransactionEvent = JSON.parse(message.body);
                    this.onMessageCallback(event);
                }
            });
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }

    activate() {
        this.client.activate();
    }

    deactivate() {
        this.client.deactivate();
    }

    subscribe(callback: (message: TransactionEvent) => void) {
        this.onMessageCallback = callback;
    }
}

export const webSocketService = new WebSocketService();
