export default function IssueSection({selectedSpecificIssueName,
                                      selectedSpecificIssueDescription}) {


    return (
        <div className={"flex-grow-1 issue-section d-flex flex-column black-border"}>

            <div className={"d-flex flex-row mb-3"}>
                <h5>{selectedSpecificIssueName}</h5>
            </div>

            <div className={"d-flex flex-row h-100"}>
                <div className={"issue-visualization w-50"}>INSERT VISUALIZATION</div>
                <div className={"issue-text w-50"}>
                    <div>
                        <p>
                            {selectedSpecificIssueDescription}
                        </p>

                    </div>

                    <div>
                        <h5>Solutions</h5>
                        <p>
                            To reduce injuries in your neighborhood, pay attention to how public space is used in your
                            neighborhood. Here are a few ideas:
                            Consequat interdum varius sit amet mattis vulputate enim nulla. Curabitur vitae nunc sed
                            velit dignissim.</p>
                        <p>
                            Consequat interdum varius sit amet mattis vulputate enim nulla. Curabitur vitae nunc sed
                            velit dignissim.
                            Vel risus commodo viverra maecenas accumsan lacus vel facilisis.
                        </p>
                    </div>
                </div>
            </div>


        </div>

    )
}