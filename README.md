# React Dashboard Application

This is a modern, responsive dashboard application built with React, TypeScript, Tailwind CSS, and React Query. It features authentication using Auth0, efficient data fetching and caching, and a sleek user interface with animated components.

### Features
- **Authentication**: Secure login and redirection using Auth0.
- **Protected Routes**: Pages that require authentication, implemented using custom route guards.
- **Dynamic Dashboard**: A responsive dashboard displaying various data metrics with animated charts and interactive features.
- **State Management**: Efficient management of global and local states using React hooks and context.
- **Loading and Error Handling**: Enhanced user experience with custom loading animations and error messages.
- **Styling**: Tailwind CSS for quick, maintainable, and responsive styling.

### Dashboard

The dashboard in this application provides a visual representation of trade data using different types of charts. Each chart component is designed to present data interactively and efficiently. Here's a brief description of the charts used:

1. **Line Chart**
   - *Component*: `LineChartCard.tsx`
   - *Description*: This component displays a line chart that visualizes the annual trade value for selected countries. It includes a country filter that allows users to 
                    view trade data for specific countries.
   - Features:
       - Interactive dropdown to filter data by country
       - Smooth transitions and hover effects to enhance user experience

2. **Bar Chart**
   - *Component*: `BarChartCard.tsx`
   - *Description*: The bar chart component presents trade rank changes among various countries. It provides an easy way to understand the comparative performance of 
                    countries in trade rankings.
   - Features:
       - Loading and error handling with custom animations.
       - Hover and transition effects for an engaging interface

3. **Pie Chart**
   - *Component*: `PieChartCard.tsx`
   - *Description*: This component shows a pie chart of the top trade partners, displaying the share of trade for the top N partners. By default, it fetches and visualizes 
                    data for the top 5 trade partners.
   - Features:
       - Clean and appealing gradient backgrounds
       - Simple and intuitive representation of proportional data

4. **Area Chart**
   - *Component*: `AreaChartCard.tsx`
   - *Description*: The area chart component provides a cumulative view of trade values over time. It allows users to observe trends and the cumulative impact of trade data.
   - Features:
       - Smooth area transitions to visualize growth
       - Responsive design and seamless loading animations

### Technologies Used
- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Tailwind CSS**: For rapid and responsive UI development.
- **React Query**: For efficient and optimized data fetching.
- **React Router**: For routing and navigation.
- **Auth0**: For secure user authentication.

# Setup Instructions

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. **Clone the Repository**
   - git clone `https://github.com/rishik-m/Analytics_Dashboard_SSO`
   - cd `Analytics_Dashboard_SSO`
2. **Install Dependencies Using `npm` Or using `yarn`**
   - `npm install`
   - `yarn install`
3. **Environment Variables**
   - Create a `.env` file in the root of the project.
   - Add the following variables (replace with your own values):
     - REACT_APP_AUTH0_DOMAIN=`your-auth0-domain`
     - REACT_APP_AUTH0_CLIENT_ID=`your-auth0-client-id`
4. **Run the Application Using `npm` Or using `yarn`**
   - `npm start`
   - `yarn start`
   - The application will start on `http://localhost:3000` by default.
