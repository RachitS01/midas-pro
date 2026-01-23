# MidasPro 🚀

> **A modern, full-stack financial transaction simulation engine.**  
> *Built from scratch | Inspired by the JPMC Virtual Experience.*

---

## 👋 Hello!

Welcome to **MidasPro**. This is a project I built to challenge myself and demonstrate my full-stack engineering skills. I drew heavy inspiration from the JPMorgan Chase virtual software engineering job simulation, but instead of just following the script, I wanted to build something **from the ground up**—with my own architecture, my own design choices, and my own flair.

It's a web application that simulates a real-time trading dashboard. Data flows constantly, balances update instantly, and it's all wrapped in a premium, dark-mode "glassmorphism" UI that I'm pretty proud of.

## 🛠 The Tech Stack

I tried to use a modern, robust stack for this:

*   **Backend**: Java 17, Spring Boot 3 (The solid core)
*   **Frontend**: React 18, TypeScript, Material-UI (The flashy exterior)
*   **Database**: PostgreSQL (Data persistence that survives restarts!)
*   **Messaging**: Apache Kafka (Handling high-throughput transaction streams)
*   **Real-time**: WebSocket / STOMP (For that instant "alive" feel)
*   **Infrastructure**: Docker & Docker Compose (One command to rule them all)

## ✨ Cool Features

*   **Real-Time Dashboard**: Watch your balance change live as transactions flow in via WebSockets.
*   **Premium Dark UI**: I spent time polishing the aesthetics—gradients, glass blur effects, and smooth transitions.
*   **Full Auth Flow**: Sign Up, secure Login (JWT), and session management.
*   **Persistent Data**: Uses a real PostgreSQL database running in Docker, so you don't lose your user data when you restart.
*   **Optimized Builds**: The Docker images are highly optimized (Alpine Linux), keeping the footprint small and efficient.

## 🚀 How to Run It

I've containerized everything, so you don't need to install Java, Node, or Kafka locally. You just need **Docker**.

1.  **Clone the repo**
    ```bash
    git clone https://github.com/YOUR_USERNAME/midas-pro.git
    cd midas-pro
    ```

2.  **Spin it up**
    ```bash
    docker-compose up --build
    ```
    *(Give it a minute—it needs to download the images and start Kafka, Zookeeper, Postgres, and the Spring Boot app.)*

3.  **Explore**
    *   Open **http://localhost:3000** in your browser.
    *   **Sign Up** for a new account.
    *   Start making transactions and watch the magic happen!

## 🧠 Under the Hood

One challenge I faced was the massive disk usage of the default Docker images (Java is heavy!). I optimized the build process to use **multi-stage Docker builds** and switched to **Alpine Linux** versions for the runtime. This drastically reduced the storage footprint without losing any performance.

---

*Thanks for checking out my code! It's a demo, so it might have a bug or two, but it represents a lot of learning and late-night coding sessions. Enjoy!* 💻
