import Markdown from 'react-markdown';
import useAutoScroll from './hookz/useAutoScroll';
import Spinner from './Spinner';
import userIcon from './botimages/user.svg';
import assistantIcon from './botimages/robot.png';
import errorIcon from './botimages/error.svg';

function ChatMessages({ messages, isLoading }) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef} className="grow space-y-4">
      {messages.map(({ role, content, loading, error }, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl ${
            role === 'user' ? 'bg-gray-100' : 'bg-gray-200'
          }`}
        >
          {/* Show icon based on role */}
          <img
            className="h-[26px] w-[26px] shrink-0"
            src={role === 'user' ? userIcon : assistantIcon}
            alt={role}
          />

          <div>
            <div className="markdown-container">
              {loading && !content ? (
                <Spinner />
              ) : (
                <Markdown>{typeof content === 'string' ? content : JSON.stringify(content)}</Markdown>
              )}
            </div>
            {error && (
              <div className="flex items-center gap-1 text-sm text-red-500 mt-2">
                <img className="h-5 w-5" src={errorIcon} alt="error" />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
