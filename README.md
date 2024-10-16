# **Meet**

### Meet is a progressive web application (PWA) intended to find, compare, and stay up to date on upcoming events near you. Meet was built with React following a Test Driven Development technique (TDD). Meet utilized the Google Calendar Application Programming Interface (API)

## **Table of Contents**
- Installation
- Technologies Used
- Configuration
- Available Scripts
- API Configuration
- Testing
- Contributing
- License

## **Installation**
To run the app locally, follow these steps:

1. Clone the repository:
`git clone https://github.com/x-lamprocapnos-x/meet.git`
2. Navigate to the project folder:
`cd meet`
3. Install dependencies:
`npm install`
4. Start the development server:
`npm start`
The app will be available at `http://localhost:3000.`


## **Features**
- Google Calendar Integration: Displays events directly from the Google Calendar API.
- City-based Filtering: Search and filter events by city.
- Charts and Visualizations: Interactive charts to visualize events by genre and city.
- Offline Support: Works offline and syncs data when reconnected.
- Responsive Design: Seamless experience across desktop and mobile devices.
- PWA Compatibility: Installable as a web app for a native-like experience.

## **Technologies Used**
- React: Front-end library for building UI components.
- Recharts: For interactive charts and data visualization.
- Google Calendar API: For fetching real-time events.
- Workbox: To enable offline capabilities through service workers.
- NProgress: Loading indicators for API calls.
- Jest & Testing Library: Unit testing and integration tests.
- Puppeteer: Automated browser testing.

## **Configuration**
1. Google Calendar API Setup:

-Create a project in the Google Developer Console.
-Enable the Google Calendar API.
-Create OAuth 2.0 credentials and note the Client ID and Client Secret.
-Add the following redirect URI:
`https://x-lamprocapnos-x.github.io/meet/`
2.Environment Variables:
Create a .env file and configure the following variables:
`REACT_APP_CLIENT_ID=<your-client-id>`
`REACT_APP_CLIENT_SECRET=<your-client-secret>`
`REACT_APP_CALENDAR_ID=<your-calendar-id>`

## **Available Scripts
- Start Development Server:
`npm start`
- Build for Production:
`npm run build`
- Run Tests:
`npm test`
- Deploy to GitHub Pages:
`npm run deploy`

## **API Configuration**
- Authentication Flow:
The app uses OAuth2 to authenticate with Google Calendar. When the app loads, it checks for an access token. If not found, it redirects the user to the Google authentication page.

- Events Fetching Logic:
Events are retrieved through:
`const url = https://srdcvrl6mc.execute-api.us-east-2.amazonaws.com/dev/api/get-events/${token};`
`const response = await fetch(url);`
`const result = await response.json();`
- Offline Handling:
When offline, cached events are retrieved from local storage:
`const events = localStorage.getItem("lastEvents");`

## **Testing**
This project uses Jest, React Testing Library, and Puppeteer for unit and end-to-end tests.
Running Tests:
- Run all tests:
`npm test`
- Test specific components:
`npm test <ComponentName>`


## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
`git checkout -b feature/your-feature-name`
3. Commit your changes:
`git commit -m "Add your message"`
4. Push the branch:
`git push origin feature/your-feature-name`
5. Open a pull request.

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.

