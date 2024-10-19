import React from 'react';

export default function Post({ params }: { params: { postId: string } }) {
  return <div>Post {params.postId}</div>;
}
