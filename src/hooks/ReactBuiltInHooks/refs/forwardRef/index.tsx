import React, {type FC, forwardRef, type Ref, useId, useImperativeHandle} from "react";

//region components
export const ForwardRefWrapped = forwardRef<TRef,TProps>((props, ref) => {
    const id = useId();

    useImperativeHandle(ref, () => {
        return {componentID: id}
    }, [id]);

    return <>ForwardRefExample</>
});

export const ButtonWithoutForwardRef: FC<ButtonWithoutForwardRefProps> = ({ ref, children, onClick }) => {
    /** ⚠️ ВНИМАНИЕ: в React 19 пропс ref можно использовать без forwardRef **/
    return (
        <button ref={ref} onClick={onClick}>
            {children}
        </button>
    );
};
//endregion

//region types
interface ButtonWithoutForwardRefProps {
    ref?: Ref<HTMLButtonElement>;
    // другие пропсы
    children: React.ReactNode;
    onClick?: () => void;
}



type TProps = { name: string};
type TRef = { componentID: string};


//endregion