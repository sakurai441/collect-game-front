import auth from "../../lib/firebase"

const logOut = () => {
  try {
    auth.signOut()
    location.reload()
  } catch (e) {
    alert(e.message)
  }
}

export default logOut
