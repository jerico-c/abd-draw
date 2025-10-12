Of course. Here is a comprehensive `README.md` for your project based on the files you've provided.

-----

# ABD Revisi Kilat

ABD Revisi Kilat is a specialized single-page web application designed as a 2D schematic editor for revising telecommunication network As-Built Drawings (ABD). It provides a user-friendly and efficient interface tailored for a professional workflow.

## Features

  - **Interactive Drawing Canvas**: A central canvas powered by Fabric.js for creating and manipulating schematic diagrams.
  - **Telecommunication Symbol Library**: A dedicated panel with common industry symbols like ODC, ODP, Poles, Closures, and more, ready to be added to the canvas.
  - **Properties Panel**: A context-aware sidebar that displays and allows editing of properties for any selected object.
  - **Save & Load**: Persist your work by saving the entire drawing to a JSON file and loading it back into the editor at any time.
  - **PDF Export**: Generate a high-quality, A3 landscape PDF of your drawing, complete with a professional title block.

## Tech Stack

  - **Frontend**: React, Vite, TypeScript
  - **Canvas Library**: Fabric.js
  - **Styling**: Tailwind CSS with shadcn/ui components
  - **Backend**: Express.js
  - **Database ORM**: Drizzle ORM (configured for PostgreSQL)
  - **PDF Generation**: jsPDF, html2canvas

## Getting Started

### Prerequisites

  - Node.js (v20.11.0 or higher recommended)
  - npm or another package manager

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ABDSalesLead
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your PostgreSQL database connection string.

    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname"
    ```

4.  **Run the development server:**
    This command starts both the frontend and backend servers with hot-reloading.

    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5000`.

## Available Scripts

  - `npm run dev`: Starts the development server.
  - `npm run build`: Builds the client and server for production.
  - `npm run start`: Runs the production-ready server.
  - `npm run db:push`: Pushes database schema changes using Drizzle Kit.
