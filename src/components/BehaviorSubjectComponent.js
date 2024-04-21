import React, { useState, useEffect } from 'react'
import { BehaviorSubject } from 'rxjs'

// Create a BehaviorSubject with an initial loading state
const userDataSubject = new BehaviorSubject({
  loading: true,
  data: null,
  error: null,
})

// Function to fetch user data
function fetchUserData() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((data) => {
      userDataSubject.next({ loading: false, data, error: null })
    })
    .catch((error) => {
      userDataSubject.next({ loading: false, data: null, error })
    })
}

const UserDataComponent = () => {
  const [userData, setUserData] = useState(userDataSubject.getValue())

  useEffect(() => {
    // Subscribe to the BehaviorSubject
    const subscription = userDataSubject.subscribe({
      next: (state) => setUserData(state),
      error: (err) => console.error('Error:', err),
      complete: () => console.log('Stream completed'),
    })

    // Fetch data initially
    fetchUserData()

    // Cleanup function on component unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div>
      {userData.loading && <p>Loading...</p>}
      {userData.error && <p>Error: {userData.error.message}</p>}
      {userData.data && (
        <div>
          <h1>{userData.data.name}</h1>
          <p>Email: {userData.data.email}</p>
        </div>
      )}
    </div>
  )
}

export default UserDataComponent
