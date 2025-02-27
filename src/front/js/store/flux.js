const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
  
		token: null,
	  },
	  actions: {
		// Use getActions to call a function within a fuction
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
  
		getMessage: async () => {
		  try {
			// fetching data from the backend
			const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
			const data = await resp.json();
			setStore({ message: data.message });
			// don't forget to return something, that is how the async resolves
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		changeColor: (index, color) => {
		  //get the store
		  const store = getStore();
  
		  //we have to loop the entire demo array to look for the respective index
		  //and change its color
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
  
		  //reset the global store
		  setStore({ demo: demo });
		},
		getLogin: async (data) => {
		  let store = getStore();
  
		  try {
			let response = await fetch(`${process.env.BACKEND_URL}/login`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(data),
			});
			let responseData = await response.json();
			setStore({
			  token: responseData.token,
			});
			localStorage.setItem("token", responseData.token);
		  } catch (error) {
			console.log(error);
		  }
		},
		getRegister: async (data) => {
			let store = getStore();
	
			try {
			  let response = await fetch(`${process.env.BACKEND_URL}/user`, {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			  });
			  let responseData = await response.json();
			  setStore({
				token: responseData.token,
			  });
			  localStorage.setItem("token", responseData.token);
			} catch (error) {
			  console.log(error);
			}
		  },
	  },
	};
  };
  
  export default getState;