import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";

export default async function Page() {
    const dirName = path.basename(path.dirname(import.meta.url));
    const content = await getPageContent(`${dirName}.md`);

    return (
        <div className="p-4">
            <Markdown content={content ?? ""} />
        </div>
    );
}