const data = React.createElement(
    'div',
    { id: "parent" }, // Example of adding an ID to the parent div
    React.createElement('h1', { id: 'heading' }, 'Hello from React!'),
    React.createElement('p', {}, 'This is a simple React example.')
);
const root = ReactDOM.createRoot(document.getElementById('beat'));
root.render(data);