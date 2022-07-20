

export default function IssueSection() {


    return (
        <div className={"flex-grow-1 issue-section d-flex flex-column black-border"}>


            <div className={"d-flex flex-row justify-content-between mb-3"}>
                <h5>Issue Name</h5>
                <h5>Show Map</h5>
            </div>

            <div className={"d-flex flex-row h-100"}>
                <div className={"issue-visualization w-50"}>INSERT VISUALIZATION</div>
                <div className={"issue-text w-50"}>
                    <div>
                        <p>
                            Eget nullam non nisi est sit amet facilisis magna etiam.
                            Sed elementum tempus egestas sed sed risus pretium quam.
                            Consectetur adipiscing elit ut aliquam purus sit amet.
                        </p>

                    </div>

                    <div>
                        <h5>Solutions</h5>
                        <p>
                            To reduce injuries in your neighborhood, pay attention to how public space is used in your neighborhood. Here are a few ideas:
                            Consequat interdum varius sit amet mattis vulputate enim nulla. Curabitur vitae nunc sed velit dignissim.</p>
                    </div>
                </div>
            </div>


        </div>

    )
}