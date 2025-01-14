# Dog Explorer

Welcome to the **Dog Explorer**! This project is a feature-rich application where users can browse, interact with, and manage information about dog breeds. The app includes functionalities like searching, sorting, voting, and editing dog breed details, all presented through an intuitive and engaging user interface.

## Features

- **Home Page**: Introduction to the application and navigation to dashboard.
- **Dashboard**:
  - View a list of all available dog breeds.
  - Search for dog breeds by name.
  - Sort dog breeds:
    - Alphabetically
    - By lifespan
    - By votes
  - Upvote or downvote dog breeds.
- **Details Page**:
  - View detailed information about a specific dog breed.
  - Edit and update a dog breed's information directly.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Duarti/Thrive-Protocol-Assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Thrive-Protocol-Assignment
   ```

3. Add a `.env` file to the project root and include your The Dog API key (You can get your API key from here: https://www.thedogapi.com/) in the following format:

   ```env
   VITE_THE_DOG_API_KEY="YOUR_API_KEY"
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open your browser and go to:

   ```
   http://localhost:5173
   ```

## Usage

1. **Explore Dog Breeds**:

   - Navigate to the dashboard to see a list of dog breeds.
   - Use the search bar to find a specific dog breed by name.
   - Sort the list using the available options (alphabetically, lifespan, or votes).

2. **Interact with Dog Breeds**:

   - Upvote or downvote your favorite dog breeds by selecting the dog breed(s) you want to upvote or downvote (You can select dog breeds by clicking them), and then click the upvote / downvote button.

3. **View and Edit Details**:

   - Click on a "Details" to view its detailed information.
   - Use the edit functionality to update the dog's information, including name, lifespan, and other details.

## Technologies Used

- **Frontend**: React 18 with Typescript
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Data Fetching**: Tanstack React Query
- **Routing**: React Router
- **Code formatting and linting**: ESLint and Prettier

Note: Actions such as votes and editing dogs are done on local storage.

## Contact

For questions, feedback, or collaboration, feel free to reach out:

- Email: [duartnishefci@gmail.com](mailto\:duartnishefci@gmail.com)
- GitHub: Duarti

---

Thank you for checking out the Dog Explorer! Happy browsing!
