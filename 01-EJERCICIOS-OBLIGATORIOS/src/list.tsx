import React from "react";
import { Link, generatePath } from "react-router-dom";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

interface filterContext {
  newFilter: string;
  newSetFilter: (value: string) => void;
}

const MyfilterContext = React.createContext<filterContext>({
  newFilter: "",
  newSetFilter: (value) => {
    console.log("MyContext missing privder in APP?");
  },
});

export const MyfilterContextProvider: React.FC = (props) => {
  const [newFilter, newSetFilter] = React.useState("lemoncode");

  return (
    <MyfilterContext.Provider value={{ newFilter, newSetFilter }}>
      {props.children}
    </MyfilterContext.Provider>
  );
};

export const ListPage: React.FC = () => {
  const filterContext = React.useContext(MyfilterContext);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const { newFilter , newSetFilter} = React.useContext(MyfilterContext); 
  const [filter, setFilter] = React.useState(newFilter);

  const handleFilter = (e) => {
    e.preventDefault();
    newSetFilter(filter);
  };

 

  React.useEffect(() => {
    fetch(`https://api.github.com/orgs/${filterContext.newFilter}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  },[filterContext]);

  return (
    <>
      <form onSubmit={handleFilter}>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button>Buscar</button>
      </form>
      <h2>Hello from List page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {}
          {members.map((member) => (
            <tr>
              <td>
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </td>
              <td>
                <span>{member.id}</span>
              </td>
              <td>
                <Link
                  to={generatePath(`/detail/:id`, {
                    id: member.login,
                  })}
                >
                  {member.login}
                </Link>
                {""}
              </td>
            </tr>
          ))}
          {}
        </tbody>
      </table>
    </>
  );
};
