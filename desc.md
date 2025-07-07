# IdeaMiner

An AI-powered platform that uncovers and analyzes trending business ideas from Reddit discussions.

## Overview

IdeaMiner is a React Native application that automates the process of finding your next big idea. It scours Reddit for hot topics and discussions, uses AI to analyze their potential, and presents you with a curated feed of the most promising business concepts. Say goodbye to manual research and hello to data-driven inspiration.

## Features

-   **AI-Powered Idea Sourcing**: Automatically scrapes Reddit for trending posts and comments in communities related to startups, business, and technology.
-   **Intelligent Analysis**: Leverages AI to analyze the sentiment, engagement, and commercial potential of each discussion, filtering out the noise.
-   **Curated Idea Feed**: Presents a clean, easy-to-browse dashboard of the top-ranked ideas, complete with summaries and links to the original discussions.
-   **Idea Details**: Dive deeper into any idea with a detailed view showing key discussion points, user sentiment, and market potential scores.
-   **Saved Ideas**: Bookmark promising ideas to your personal collection for later review.
-   **Secure Authentication**: Secure user accounts to save and track your favorite ideas.
-   **User Account Management**: Manage your user profile and preferences.

## Tech Stack

-   **React Native + Expo**: For building the cross-platform mobile application.
-   **Supabase**: For backend services, including authentication and database.
-   **AI/ML**: Custom models for Natural Language Processing (NLP), sentiment analysis, and trend identification.
-   **Reddit API**: For sourcing raw discussion data.
-   **React Navigation**: For handling navigation between screens.
-   **React Native Paper**: For building the user interface with Material Design components.
-   **JavaScript**: The primary programming language.

## Authentication & Data Sync

-   **Authentication**: Powered by Supabase Auth, with a secure email/password login flow.
-   **Data Sync**: Ideas, analysis results, and user data are stored in a Supabase PostgreSQL database, ensuring your data is always available.

## Project Architecture

The project follows a standard React Native structure:

-   `/app/screens`: Contains the different screens of the application.
-   `/app/components`: Reusable UI components.
-   `/app/navigation`: Navigation logic and configuration.
-   `/app/services`: Functions for interacting with Supabase, Reddit API, and the AI backend.
-   `/app/constants`: Application-wide constants.
-   `/app/context`: App-wide context providers.
-   `/app/hooks`: Custom React hooks.
-   `/app/utils`: Helper functions.

## How to Run

1.  Clone the project.
2.  Install dependencies: `npm install`
3.  Set up your Supabase and Reddit API credentials in a `.env` file.
4.  Start the development server: `npm start`
5.  Run on an emulator or a physical device.

## Status & Next Steps

-   **Completed**: User authentication, core AI sourcing and analysis pipeline, idea dashboard, and saved ideas functionality.
-   **Upcoming**: Expanding to other platforms (e.g., Twitter, Hacker News), allowing users to customize their feeds, and adding in-depth market analysis reports for each idea.
