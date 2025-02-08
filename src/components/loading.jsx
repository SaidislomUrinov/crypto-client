import { Spinner } from "@material-tailwind/react";

function Loading() {
    return (
        <div className="flex items-center justify-center flex-col fixed top-0 left-0 w-full h-[100vh] z-[6] bg-white">
            <Spinner color="brown" className="w-[40px] h-[40px]" />
        </div>
    );
}

export default Loading;