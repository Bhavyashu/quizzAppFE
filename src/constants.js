const evnrionment = process.env.REACT_APP_ENV

const base_url = (evnrionment=='prod')?"https://quzzappbackend.onrender.com/api/v1":"http://localhost:3003/api/v1"

export default base_url;