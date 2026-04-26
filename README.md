[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ir0n2wwK)
# Web Technologies - Exercise 3

The third exercise is about styling and responsive design, but also about semantic HTML and a new endpoint on the server. As usual, you find detailed information about these parts in the **Tasks** section below.

To set up your working environment for the project, you will have to perform the same steps you already used in exercise 1 and 2. First, you **clone** the project and configure it in an IDE, then you **install** the project's dependencies. To do so, run 

    npm install

in the project's root directory, where this `README.md` file is located. 

Use 

    npm start

or using `nodemon` (the **recommended** option)

    npm run start-nodemon

to start the server. In any case the server will be running on port 3000. You should see the message

    Server now listening on http://localhost:3000/

in your terminal. Navigate to [http://localhost:3000/](http://localhost:3000/) to test the application manually.

## Project structure

Our starting point for exercise 3 is a solution of exercise 2. 

On the server-side, we have our `movie-model.js`, containing our initial movie data. In `server.js` you will find the server startup code defining the three endpoints we have so far, `GET /movies`, `GET /movies/:imdbID`, and `PUT /movies/:imdbID`.

On the client-side, we have two HTML documents, namely `index.html` and `edit.html`. Both reference their respective JavaScript and CSS files, e.g. `index.html` references `index.js` and `index.css`.

The two CSS files are based on a common CSS file named `base.css`, which they both import.

In addition, there is a new JavaScript file named `builders.js`, which is imported by `index.js` and contains classes to build HTMLElements using the [Builder Pattern](https://en.wikipedia.org/wiki/Builder_pattern). 

Here is an overview of all the files:

**Server-side**
+ `server/server.js` containing the start up code and the endpoints,
+ `server/movie-model.js` will contain the data structure in which the movies are held.

**Client-side**:
+ `server/files/index.html` the overview page showing all movies,
+ `server/files/index.js` JavaScript code of `index.html`
+ `server/files/index.css` stylesheet for `index.html` file.
+ `server/files/edit.html` the movie edit page,
+ `server/files/edit.js` JavaScript code of `edit.html`.
+ `server/files/edit.css` stylesheet for `edit.html`
+ `server/files/base.css` common base stylesheet for `index.css` and `edit.css`
+ `server/files/builder.js` HTML element builders imported and used in `index.js`

## Tasks

### 🚨 Important: Reusing your work from Exercise 2 (strongly recommended)
**Before you begin Exercise 3, bring over your implementation from Exercise 2. This includes the *HTML markup* you used, your *styling*, and possibly also your implementation of the *server-side endpoints*.**

Now, let's tackle this new challenge! Here's a first overview of the three tasks, details follow below:

1. Using HTML landmark elements we restructure our `body` to this:

    ![Basic structure of the page](images/structure.svg "Basic structure of the page")

    Then, using our knowledge about DOM manipulation, XMLHttpRequests, and server-side endpoints we dynamically add buttons to the `nav` element for the movie genres that exist.

    This is our default layout, a mobile-first stack layout.

2. In this task we are going to use CSS Grid Template Areas to change our layout to look like this:

    ![Styled structure of the page](images/structure-styled.svg "Styled structure of the page")

    This does not mean that we change the structure in our DOM, we are simply changing the layout using CSS!

    This is our desktop layout, when the available space in the viewport gets wider.

    Also, we make the genre specific buttons (that we added in task 1) work.
3. Finally, we lay out the contents of our elements using CSS Flexbox. You should use flexbox at least three times. For example, you can center the content of the `header`, and lay out the contents of `nav`,`footer`, and `main` either horizontally or vertically.

### Task 1: Structure the overview page using semantic HTML, add navigation to genre specific movies

**1.1 In `index.html`.** We now want to add landmark elements to layout our application in broad strokes. This means that the basic page structure is going to change.

Add the following elements with the specified content:
* A `header` element that contains a text to your liking, e.g. `My movies!`
* A `nav` element will contain the genres we retrieve from the server. No content yet.
* A `main` element, which for now is empty. In here we will add the main content of our application, which is the list of movies.
* A `footer` element that contains additional information about the page. This might be copyright information, your contact info or a link to our university's web page.

After this task and for the time being, the page's elements will be laid out vertically and look something like this:

![Page without data](images/without-data.jpg "Page without data")

**1.2 In `server.js`.** Add the `GET /genres` endpoint to the server

The new endpoint returns the list of genres in your movie collection sorted alphabetically. 

E.g., you have three movies in your model and these have genres
* `Action`, `Adventure`, `Drama`,
* `Comedy`, `Drama`, `Fantasy` and
* `Drama`, `Romance`.

Then for these movies your endpoints returns `["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Romance"]`.

**1.3. In `index.js`.** Add buttons to the navigational area of your application for each of the genres. Also include one button for *all* movies.

In 1.1., you added a `nav` element to the application. Now make sure that when the genres are successfully loaded by the `XMLHttpRequest` add the end of `index.js`, you add them to the `nav` element dynamically. Make sure you pick an appropriate HTML element to represent the individual genres and use a button element (`button`) for each genre returned from the server. As already mentioned above, also add a button for *all* the genres at the beginning of the list.

For the example from above, e.g., the genres, "Action", "Adventure", "Comedy", "Drama", "Fantasy", and "Romance", you would add the following buttons:
* *All*: will load *all* movies
* *Action*: will load movies with genre *Action*
* *Adventure*: will load movies with genre *Adventure*

    ... more buttons for *Comedy*, *Drama*, *Fantasy* ...
* *Romance*: the last button, will load movies with genre *Romance*

Add click handlers to all buttons that call the function `loadMovies()`, which is already implemented in `index.js`. 

Now, because the `onload` callback of the `XMLHttpRequest` at the end of `index.js` clicks the first button in the `nav` element (which should be the `All movies` button) the existing implementation will add the movies dynamically to the newly introduced `main` element. For rendering, we implemented the `appendMovie` functions that makes use of our `ElementBuilder`. You can keep this rendering, adapt it to your liking, or exchange it with your own rendering from the previous exercises.

### Task 2: Applying Grid Template Areas to lay out our overview page, make the genre buttons work

**2.1. In `index.css`**. A Grid Container.

Laying out a container using Grid Template Areas is a three step process, both are implemented in `index.css`.

1. We specify an element to be a Grid container and specify the areas the container will use. In project, the `body` element is the Grid container.

    Specify the `display` property and the rows, columns and areas to correspond roughly to the following layout:

    ![Columns and rows](images/grid-columns-and-rows.svg "Columns and rows")

    The important thing is to make our `main` element grow when the viewport size changes. Test this in your browser by either resizing your browser window or using the Web Development tools. As areas you can use: `h` for `header`, `n` for `nav`, `m` for `main`, and `f` for `footer`, for example. 

2. Now, assign the areas defined in the container in step 1 to the child elements of our container. These are `header`, `nav`, `main`, and `footer`.

    When you finished this task, the look of the page will have already changed to something like this:

    ![Laid out with grid](images/with-grid-layout.jpg "Laid out with grid")

3. We want the footer to be visible always, for this to work we have to control how the `main` element behaves once its contents get to big to fit on the viewport. Set the `main` element's `overflow-y` property to `auto` to see the difference. 

Finally, make the page responsive. What we would like to see is that on a smaller device, the layout is a **one-column stack layout**, and only on a wider screen we use the **grid area layout**. You will need to use a media query (`@media`) for this to work! Use a sensible breakpoint - that is the width at which your layout changes from one column stack layout to desktop layout - and test that your application responds accordingly.

**2.2. In `index.js` and `server.js`.**
Review the implementation of `loadMovies(...)` in `index.js` and pass on the genre given by the button click handler to the movie request. 
* On the client-side, you need to make sure that the genre-specific click handlers pass the genre to the `loadMovies(...)` function. In it, set the genre parameter to the request. See [URLSearchParams:set()](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/set). **Important: Use 'genre' as the name of your parameter!**
* On the server-side, in the `GET /movies` endpoint, you use the query parameter sent by the client to filter the movies of the collection. Like the path parameters we used in exercise 2, the query parameters also are available on the request object of the endpoint hit, e.g., a query parameter named **genre** will be available through `req.query.genre`. 

    **Make sure that the endpoint returns *all* movies when no query parameters is present and the *genre specific* movies when a genre is given.**

After this task, the page already will be fully functional. On to the layout!

### Task 3: Using Flexbox to lay out elements

In this task you are expected to use flexbox to lay out elements. Remember that flexbox is used to lay out elements in a row or column. Here are some ideas you could use flexbox for:

  - One of the use cases of the Flexbox is to center a single child element in its parent's box. You could center the title in the header.
  - You could also use Flexbox to layout the buttons in the `nav` element. You could add a gap in between them and stretch them, for example.
  - In the `main` container, you could use `flex-wrap` to wrap the movies when space get smaller and experiment with gaps and other features of Flexbox.
  - In the footer, you could layout the elements vertically.

**Hint**: If you have an unnecessary scrollbar on the body element and want to get rid of it, try setting the body's `margin` to **0**, that should do it.

Your final result may look something like this:

![The final result](images/final.jpg "A screenshot of the final result")

**Done, congratulations!** Don't forget to push!