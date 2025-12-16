import React, {useEffect} from 'react';

/** https://www.youtube.com/watch?v=0ZJgIjIuY7U&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=2 **/

export function WebDevSimplified1() {
  const [type, setType] = React.useState<string>('posts');
  const [items, setItems] = React.useState<any>([]);

  useEffect(() => {
    console.log('only mount', type);
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then(response => response.json())
      .then(json => setItems(json))
  }, [type]);

  useEffect(() => {
    console.log('all renders', type);
  });

  return (
    <div>
      <button className="btn" onClick={() => setType('posts')}>posts</button>
      <button className="btn" onClick={() => setType('users')}>users</button>
      <button className="btn" onClick={() => setType('comments')}>comments</button>

      {items.map((item: any) => <pre>{JSON.stringify(item)}</pre>)}
    </div>
  );
}

export function WebDevSimplified2() {
  const [width, setWidth] = React.useState<number>(window.innerWidth);



  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div>
      {width}
    </div>
  );
}


