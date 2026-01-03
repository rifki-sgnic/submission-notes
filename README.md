# NotesApp

This project was created as part of the submission for the "Belajar Fundamental Aplikasi Web dengan React" class on Dicoding. NotesApp is a Single Page Application (SPA) built using React (Vite) and TailwindCSS. This application focuses on implementing APIs, Context, and Hooks.

## Key Features
- **User Authentication**: Login and register users using APIs.
- **Notes Management**: Add, view details, archive, and delete notes.
- **Theme and Language**: Supports theme settings (dark/light) and localization (Indonesian/English).
- **Notifications**: Display notifications using Context and Hooks.

## Technologies Used
- **React**: The main library for building user interfaces.
- **Vite**: A build tool for developing React applications.
- **TailwindCSS**: A CSS framework for fast and responsive styling.
- **Context API**: For managing global states such as authentication, theme, and notifications.
- **Custom Hooks**: To separate reusable application logic.

## Project Structure
```
public/          # Folder for public assets
src/             # Main folder for source code
  api/           # APIs for authentication and notes
  components/    # UI components like Alert, Navigation, etc.
  context/       # Context for global states
  hooks/         # Custom hooks
  layouts/       # Main application layout
  pages/         # Application pages (Home, Detail, Archive, etc.)
  utils/         # Utility functions
```

## How to Run the Project
1. Make sure Node.js is installed on your computer.
2. Clone this repository.
3. Run the following commands in the terminal:
   ```bash
   npm install
   npm run dev
   ```
4. Open the application in the browser via the URL provided by Vite (usually `http://localhost:5173`).