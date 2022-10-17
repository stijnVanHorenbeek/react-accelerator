const Search = () => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(e);
      console.log(e.target.value);
    };
  
    return (
      <div>
        <label htmlFor="search">Search: </label>
        <input
          className="text-input"
          id="search"
          type="text"
          onChange={handleChange}
        />
      </div>
    );
  };

  export default Search;