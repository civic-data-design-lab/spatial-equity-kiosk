import React, {useEffect, useState} from "react";

import CommunityProfile from "./CommunityProfile";


export default function CommunityMiddleColumn({
                                                  communitySearch,
                                                  compareSearch,
                                                  issues,
                                                  selectedSpecificIssue,
                                                  communities,
                                                  setSelectedSpecificIssue,
    moreIssuesLength, setMoreIssues, moreIssues, setMoreIssuesLength
                                              }) {
    return (
        <>
            {communitySearch && <CommunityProfile issues={issues} selectedSpecificIssue={selectedSpecificIssue}
                                                  communities={communities} communitySearch={communitySearch}
                                                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                                                  compareSearch={compareSearch}
                                                  moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
            />}
        </>

    )
}