import IframeLayout from "~/layouts/IframeLayout";

export default function Index() {
    const iframeUrl = "https://carbonable.sextan.app/public/global/custom/jqnk50pr511dah162";

    return (
        <IframeLayout>
            <div className="mt-8">
                <iframe
                    src={iframeUrl}
                    title="Your Iframe Title"
                    style={{ width: '100%', height: '100vh', border: 'none' }}
                />
            </div>
        </IframeLayout>
    )
}