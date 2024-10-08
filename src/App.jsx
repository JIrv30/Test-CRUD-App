import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = 'https://script.google.com/macros/s/AKfycbz9-16G74hXLgvfSRMtvmr9IQZXFHribfb4XSk9IWGrLxWg9TndXDCXcnZNtFj6uFU/exec'

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const postData = (status) => {
    const bodyData = new URLSearchParams();
    bodyData.append('status', status);
    bodyData.append('comment', comment);

    setIsSubmitting(true); // Set loading state to true

    fetch(url, {
      method: 'POST',
      mode:'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData.toString(),
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        window.location.reload();
      })
      .catch((error) => console.error('Error posting data:', error))
      .finally(() => setIsSubmitting(false)); // Reset loading state
  };

  const handleAccept = () => {
    postData('accept');
    console.log('Accepted');
  };

  const handleReject = () => {
    postData('reject');
    console.log('Rejected');
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);

      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-md shadow-lg transition-opacity duration-300 ease-in-out">
          Data successfully submitted!
        </div>
      )}
      {!loading &&
        data.slice(1).map((row, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex space-x-6">
              <div className="w-1/4">
                <img src="src/assets/Portrait_placeholder.png" alt="Portrait" className="rounded-full w-16 h-16 mb-4" />
                <p className="text-xl font-semibold text-gray-800">{row[2]}</p>
                <p className="text-sm text-gray-500">{row[3]}</p>
                <p className="text-sm text-gray-600 mt-2">Number of Days: {row[4]}</p>
              </div>
              <div className="w-3/4">
                <p className="text-lg text-gray-800 mb-2">Incident Date: {new Date(row[5]).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Suspension From: {new Date(row[6]).toLocaleDateString()} {row[7]}</p>
                <p className="text-sm text-gray-600">Suspension Until: {new Date(row[8]).toLocaleDateString()} {row[9]}</p>
                <p className="text-sm text-gray-600 mt-4">{row[17]}</p>
                <p className="text-sm text-gray-600">{row[18]}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-md font-semibold text-gray-800">Arbor log:</p>
              {row[13].split('    ').map((url, index) => (
                <div key={index} className="mb-2">
                  <a href={url.trim()} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">
                    {url.trim()}
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-6 space-y-4">
              <div className="flex space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full transition-all hover:shadow-lg hover:bg-green-600"
                  onClick={() => handleAccept('Accept')}
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? 'Loading...' : 'Accept'}
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full transition-all hover:shadow-lg hover:bg-red-600"
                  onClick={() => handleReject('Reject')}
                  disabled={isSubmitting} // Disable button while submitting
                >
                  {isSubmitting ? 'Loading...' : 'Reject'}
                </button>
              </div>
              <textarea
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add your comment here..."
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default App;
