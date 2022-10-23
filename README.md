# DietBuzz

Dietbuzz utilizes surveys from diners to showcase which food options are rated the highest. Dietbuzz then sends a notification to all incoming dining hall users and sends a notification to all exiting users to remind them to complete the survey.

We used the Python libraries (selenium and beautiful soup) to scrape information from the existing Nutrislice to see what dishes were available on a given day. We then uploaded the information to a Firebase Firestore database and each time someone submitted a review, we updated the database. We also used the native browser geolocation information to collect device location data. Finally, we used an HTML, CSS, and JS web app to display all the information.
