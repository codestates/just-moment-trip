import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';

function PostStore() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ backgroundColor: 'red' }}>list입니다</div>
      )}
    </div>
  );
}

export default PostStore;
