createBrowserRouter function use jo ki parameter mein array of objects leta hai
and router provider

useNavigate ()
useSearchParams()


ek dynamic variable :id in app.jsx jaha pr hum routing kr rhe hai

destructive in landing page jsx button kaise lagana hai red button wo check krna hai



Here’s the SQL query to create a table named urls with the required columns and enable Row-Level Security (RLS) in Supabase, including setting up the foreign key relationship to auth.users:

```markdown

-- Create the table 'urls'
CREATE TABLE urls (
    id INT8 PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    original_url TEXT NOT NULL,
    short_url TEXT NOT NULL,
    custom_url TEXT,
    user_id UUID REFERENCES auth.users(id),
    title TEXT UNIQUE NOT NULL,
    qr TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

-- Optionally, create a policy to allow the owner (user) to access their own rows
CREATE POLICY "user_can_access_their_own_urls"
ON urls
FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "user_can_insert_their_own_urls"
ON urls
FOR INSERT WITH CHECK (user_id = auth.uid());

```

Explanation:

The id column is a TEXT type and is the primary key.

The created_at column uses TIMESTAMPTZ and defaults to the current timestamp.

user_id is set as a foreign key to auth.users to maintain a reference to the authenticated users.

The row-level security (RLS) policies ensure that users can only access and insert their own data.



Creating API for login and SignUp
for that we have to interact with our database


Supabase Auth allows you to create and manage user sessions for access to data that is secured by access policies.

react spinner is used...

Yup, a popular schema validation library,
yup library for login/ signup validation(ye padh skte hai link youtube roadside coder)

and jab ye logging in hoga toh ek api call hogi , jiske spinner jo hai uska loading indicator aayega


when we have to make api call  , then multiple things involved , then we have to handle the loading stuff as well as before and after api call to just display the loader

and we have to handle errors as well everything
insted of repetation throught the project , we made a custom hook.. for handling api calls

iska course le skte hai for react interviews preparations that how to create custom-hooks
use-counter
use-debounce
use-fetch
use-intersection-object
use-localstorage
use-windowsize

performance optimization and machine coding content as well , toh yaha se dekh lunga ki course content and google and chatgpt krlunga

context and state management for our app which will handle the state of our user

inside we will fetch current user session who is loggedIn

signup logic likhna hai ab
made a private route in process between

row level security we are adding a level of authorization who can access our data , view our data , update or delete our data 

Cascade: Deleting a record from public.urls will also delete any records that reference it in this table in database


Whenever we click on a short link , its gonna gathered all the analytics like device , location, something like that but at this point it is not necessary , a user can be signed in or not , that is for all public , anyone can view my links

 
we havent add the update URL functionality that's why we update urls wala policy nhi  banaya hai, if we want to add functionality in our app , i can definitely add that row level security


if there are clicks associated with the URl , it well be delete as well over here

we are using library for creating qr code logo : react create qr code logo







In React, when you encounter this line:

js
const canvas = ref.current.canvasRef.current


it's dealing with *refs*, a way in React to access and manipulate DOM elements or React components directly.

To explain this line specifically:

1. **ref**: This is a reference to a DOM element or a React component. It is created using React.createRef() or useRef(). ref.current gives access to the actual DOM element or the instance of a class component.

2. **ref.current.canvasRef**: In this context, it assumes that ref.current is referring to a custom component that has a **canvasRef** property. This is likely a reference to a <canvas> element within that component.

3. **ref.current.canvasRef.current**: Since canvasRef is also a ref itself (probably created inside the custom component to reference a <canvas> element), this gives access to the actual DOM element of the canvas.

ua parser library for data of location and device etc
and we are manually making an API calls here and store all over analytics 

there are better ways to do this well for more optimised clicks like by a kafka queue

recharts api for graph

we need to learn how to host domain on hostinger later and all about domain later



TimeStamps

• Setup react App with shadcn UI
• Backend Setup with supabase database
• Hostinger setup : claim the domain (url.elixircommunity.in)

• Defining the routes
• Building the header
• Building the landing Page
• User authentication
• Login UI
• Use-fetch custom hook
• Add Context Api for User state
• Creating signup api
• SignUp UI
• Protected routes
• Make Header dynamic and logout logic
• Added row level security
• Fetch URl API and clicks API
• Building DashBoard
• Download QR code
• Create URL API
• Create URL Dialog
• Link ReDirection Page
• Statistics API
• Redirection logic
• Building link stats page