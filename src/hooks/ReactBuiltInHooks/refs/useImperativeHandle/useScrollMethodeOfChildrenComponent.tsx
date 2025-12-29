import {
    useRef,
    useImperativeHandle,
    Ref,
    ComponentPropsWithoutRef, RefObject,
    KeyboardEvent
} from 'react';

// ========== Компоненты ==========
export function Page() {
    const postRef = useRef<PostHandle>(null);

    const handleClick = () => {
        postRef.current?.scrollAndFocusAddComment();
    };

    return (
        <>
            <button onClick={handleClick}>Write a comment</button>
            <Post ref={postRef} />
        </>
    );
}

// Post component
function Post({ ref }: PostProps) {
    const commentsRef = useRef<CommentListHandle>(null);
    const addCommentRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        scrollAndFocusAddComment: () => {
            commentsRef.current?.scrollToBottom();
             // addCommentRef.current?.focus();
        }
    }), []);

    const onCommentAdded = (comment: IComment) => {
        console.log( commentsRef.current)
        commentsRef.current?.scrollToUp();
    }

    return (
        <>
            <article><p>Welcome to my blog!</p></article>
            <CommentList ref={commentsRef} />
            <AddComment ref={addCommentRef} onCommentAdded={onCommentAdded} />
        </>
    );
}

// CommentList component

function CommentList({ ref }: CommentListProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        scrollToBottom: () => {
            if (divRef.current) {
                divRef.current.scrollTo({
                    top: divRef.current.clientHeight,
                    behavior: 'smooth' // добавляем анимацию
                });
            }
        },
        scrollToUp: () => {
            if (divRef.current) {
                divRef.current.scrollTo({
                    top: 0,
                    behavior: 'smooth' // добавляем анимацию
                });
            }
        }
    }), []);

    const comments = Array.from({ length: 50 }, (_, i) => (
        <p key={i}>Comment #{i}</p>
    ));

    return <div
        className="CommentList"
        ref={divRef}
        style={{
            height: '700px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0'
        }}
    >
        {comments}
    </div>
}

// AddComment component


function AddComment({ ref, onCommentAdded, ...props }: AddCommentProps) {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitComment();
        }
    };
    const submitComment = () => {
        if (ref && isRefObject(ref)) {
            const inputElement = ref.current;
            const comment = inputElement.value.trim();
            const randomId = Date.now().toString(36) + Math.random().toString(36).substring(2)
            if (comment) {
                onCommentAdded?.({text: comment, id: randomId});
                // Очищаем поле
                if (ref.current) {
                    ref.current.value = '';
                    ref.current.focus();
                }
            }
        }


    };
    return <input
        ref={ref}
        placeholder="Add comment..." {...props}
        onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitComment();
            }
        }}
    />;
}

// ========== Типы ==========
interface PostProps {
    ref?: Ref<PostHandle>;
}

interface CommentListProps {
    ref?: Ref<CommentListHandle>;
}

type AddCommentProps = {
    ref?: Ref<HTMLInputElement>;
    onCommentAdded?: (comment: IComment) => void;
} & Omit<ComponentPropsWithoutRef<'input'>, 'ref'>;


type PostHandle = {
    scrollAndFocusAddComment: () => void;
};

type CommentListHandle = {
    scrollToBottom: () => void;
    scrollToUp: () => void;
};

interface IComment { text: string, id: string }

function isRefObject<T>(ref: Ref<T>): ref is RefObject<T> {
    return ref !== null && typeof ref === 'object' && 'current' in ref;
}