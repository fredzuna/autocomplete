1. What is the difference between Component and PureComponent? Give an example where it might break my app.
    - pureComponent is used int class component we use it to imrpove the performance since the pureComponent just will render if the the state or props has changed
    - The normal component will be rendered every time the parent component is updated, regardless of whether the props that have been passed changed or not
    - State/Props must be immutable since when we use pureComponent the mutable values will not be recognized when these values have changed and this will cause strange behavior in the functionality of the component.
2. Context + ShouldComponentUpdate might be dangerous. Why is that?
    It is not a good idea because context manages global states that can be modified from other components which can cause unnecessary re-rendering since each component works differently with the context values.
3. Describe 3 ways to pass information from a component to its PARENT.
    - 1. PROPS. We use props to pass callback functions where the callback receives values with it we can make changes to the parent from the child component
    ```js
        function ParentComponent() {
            const [dataFromChild, setDataFromChild] = useState('');

            const handleDataFromChild = (data) => {
                setDataFromChild(data);
            };

            return (
                <div>
                    <ChildComponent passDataToParent={handleDataFromChild} />
                    <p>Data from child: {dataFromChild}</p>
                </div>
            );
        }

        function ChildComponent({ passDataToParent }) {
            const handleClick = () => {
                passDataToParent('Hello from child');
            };

            return (
                <div>
                    <button onClick={handleClick}>Send Data to Parent</button>
                </div>
            );
        }
    ```
    2. React Context, is used to share values between child components, the child component consumes a context provided by the parent component and the child component changes the value of the context which the parent component has access to.
    3. Redux is a library that manages global states and shares them between components. We can update a state from a child component and a parent component can access and read it.

4. Give 2 ways to prevent components from re-rendering.
    1. we can use the state manager which allows us to share and modify global variables, we can divide the component into small subcomponents and use redux to share states and avoid rendering unnecessarily, when there is a change it will only be modified in the specific place where the global state is used

    2.  Memoization is a technique used to cache the result of expensive functions and avoid unnecessary recomputations. for example we can use React.memo for function componentes, useMemo memorizes the result of a function , useCallback memorizes functions, pureComponents for class components

5. What is a fragment and why do we need it? Give an example where it might break my app.
    It is a way to group elements without the need to use a tag such as div, p etc.
    
    An example where it might break my app is When you have style rules defined and you are expecting to have a parent element that works as the main container but you use fragments then it might not apply the styles correctly in the tags, css takes into account a structure to apply styles

6. Give 3 examples of the HOC pattern.
    we have to consider now the custom hooks are replacing the HOC

    1. I am going to send my current component inside another component to validate if it is authenticated or not, if it is not it will be redirected to the login page
    ```js
        const withAuth = (MyComponent) => {
            const AuthHOC = (props) => {
                const isAuthenticated = true; // we can get this value from localStore
                
                if (isAuthenticated) {
                return <MyComponent {...props} />;
                } else {
                return <Redirect to="/login" />;
                }
            };

            return AuthHOC;
        };
    ```
    2. I am sending the url to the component 
    ```js
        // usage
        withDataFetching('https://api.com/data')(MyComponent);

        const withDataFetching = (url) => (MyComponent) => {
            const FechingData = (props) => {
                const [data, setData] = useState([]);
                const [isLoading, setIsLoading] = useState(false);
                const [error, setError] = useState(null);

                useEffect(() => {
                    const fetchData = async () => {
                        setIsLoading(true);
                        const response = await fetch(url);
                        const data = await response.json();
                        setData(data);
                        setIsLoading(false);

                    };

                    fetchData();      
                }, [url]);

                if (isLoading) {
                    return <div>Loading...</div>;
                }

                return <MyComponent data={data} {...props} />;
            };

            return FechingData;
        };    
    ```
    3. 
    ```js
    const withPermission = (requiredPermission) => (MyComponent) => {
        const Permission = (props) => {
            const { user } = props;            
            const hasPermission = user && user.permissions && user.permissions.includes(requiredPermission);            
            return hasPermission ? <MyComponent {...props} /> : null;
        };

        return Permission;
    };
    ```
7. What's the difference in handling exceptions in promises, callbacks and async…await?
    - promises has then() and catch() methods, catch method we use to handle the error 
    - we can use callbacks method to send the error and result like this and we can handle in the callback the error
        callback(error, result) 
    - when we use async await to handle the error we need to use try catch , in the catch we are goin to handle the error 
8. How many arguments does setState take and why is it async.
    it takes two argument the "state" it is the value that we want to update and "callback" it is optional.
    when a component state is updated, it will take a while  to process the changes, that's why we can say it is asynchronous
9. List the steps needed to migrate a Class to Function Component.
    I consider these are some steps That I can follow:

    create a function component
    copy logic from the class component to the function component
    remove constructor 
    use useState hooks to declare states
    replace lifecycle methods using useEffect hooks
    test and debug

10. List a few ways styles can be used with components.
    Inline Styles
    Styled Components, we can create styles using javascript
    We can use some libraries like Tailwind CSS where we have predifined styles 
11. How to render an HTML string coming from the server
    I used this method <div dangerouslySetInnerHTML={{ __html: htmlString }} />