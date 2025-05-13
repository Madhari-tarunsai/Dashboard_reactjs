import React from "react";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
    };
  }

  handlerClick = (adc) => {
    this.setState({ loading: true }); 
    let url;
    if (adc === "fakedata") {
      url = "https://fakestoreapi.com/products";
    } else if (adc === "Dummydata") {
      url = "https://dummyjson.com/products";
    } else if (adc === "Recepicesdata") {
      url = "https://dummyjson.com/recipes";
    } else {
      return;
    }
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const finalres = res.products || res.recipes || res;
        this.setState({ data: finalres, loading: false });
      });
  };

  render() {
    return (
      <div id="main_1">
        <div id="main_2">
          <button onClick={() => this.handlerClick("fakedata")}>Fakedata</button>
          <button onClick={() => this.handlerClick("Dummydata")}>Dummydata</button>
          <button onClick={() => this.handlerClick("Recepicesdata")}>Recepicesdata</button>
        </div>

        <div id="main_3">
          {this.state.loading ? (
            <p>Please select a button</p>
          ) : (
            <div className="card-container">
              {this.state.data.map((p, i) => (
                <div className="card" key={i}>
                  <h3>{p.title || p.name}</h3>
                  {p.image || p.images ? (
                    <img
                      src={p.image || p.images?.[0]}
                      alt={p.title || p.name}
                      className="card-img"
                    />
                  ) : null}
                  <p>{p.description || p.instructions?.[0]}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
