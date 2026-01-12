import React, {forwardRef, useEffect, useId, useImperativeHandle, useRef} from 'react';

type TUseImperativeHandleProps = {refAsProps: any};

interface ComponentHandle {
    focus: () => void;
    scrollIntoView: () => void;
}

export const UseImperativeHandle: React.FC<TUseImperativeHandleProps> = ({ refAsProps }) => {
    const [count, setCount] = React.useState(0);

    useImperativeHandle(refAsProps, () => ({
        focus: () => {
            console.log('focus called');
        },
        scrollIntoView: () => {
            console.log('scrollIntoView called');
        },
    } satisfies ComponentHandle), []);

    return (
        <>
            <br/>
            <p>UseImperativeHandle expample compoents</p>
        </>
    );
};





export const UseImperativeHandleWithDeps = forwardRef<{count: number}, any>((props, ref) => {
    const [count, setCount] = React.useState(0);

    useImperativeHandle(ref, () => {
        return {count}
    }, [count])

    return <><input type={'number'} onChange={(e) => setCount(+e.target.value)} /> </>
})

export * from './useScrollMethodeOfChildrenComponent'