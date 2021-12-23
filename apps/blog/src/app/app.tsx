import styles from './app.module.scss';

import { PostCreate } from "./components/post-create"

export function App() {
  return (
    <div className="container mx-auto px-4 mt-8">
      <PostCreate />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default App;
