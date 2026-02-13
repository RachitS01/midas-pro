# MidasPro

> **A modern, simple financial transaction simulation engine. Demo purposes only**  
> *Built from scratch | Inspired by the JPMC Virtual Experience.*

---

## Hey!

Welcome to **MidasPro** (i couldn't come with anything better 🥹). This is a project I built to challenge myself and demonstrate my full-stack engineering skills. I drew heavy inspiration from the JPMorgan Chase virtual software engineering job simulation, but instead of just following the script, I wanted to build something from the ground up, with my own architecture, my own design choices, and my own flair.

It's a web application that simulates a real-time trading dashboard. Data flows constantly, balances update instantly, and it's all wrapped in a simple UI that I created.

## The Tech Stack

I tried to use a modern, robust stack for this:

*   **Backend**: Java 17, Spring Boot 3 (The solid core)
*   **Frontend**: React 18, TypeScript, Material-UI (The UI)
*   **Database**: PostgreSQL (Data persistence that survives restarts, I wonder if this is a good thing or a bad thing lol)
*   **Messaging**: Apache Kafka (Handling high-throughput transaction streams)
*   **Real-time**: WebSocket / STOMP
*   **Infrastructure**: Docker & Docker Compose (One command to rule them all. I like Docker after all...)

## Cool Features

*   **Real-Time Dashboard**: balance should change live as transactions flow in via WebSockets.
*   **Dark UI**: just a simple UI, I like dark themes.
*   **Full Auth Flow**: Sign Up, secure Login (JWT), and session management.
*   **Persistent Data**: Uses a PostgreSQL database running in Docker, so you don't lose your user data when you restart.


## How to Run It

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

##  Under the Hood

One challenge I faced was the massive disk usage of the default Docker images (Java is heavy!). I tried to optimized the build process to use **multi-stage Docker builds** and switched to **Alpine Linux** versions for the runtime. This should drastically reduced the storage footprint without losing any performance.

---

*Thanks for checking out my code! It's a demo, so it might have a bug or two, but it represents a lot of learning and one late-night coding session. Enjoy!*
