import { getAllPosts } from "../../utils/mdxUtils";

type Props = {
    children: React.ReactNode;
}

export const LessonRoot: React.FC<Props> = ({children}: Props) => {
    return (
        <>
        <div className="max-w-[80%] mx-auto px-4">
        <main className="pt-4 pb-12">{children}</main>
        </div>
        </>
    )
}

// export default LessonRoot;