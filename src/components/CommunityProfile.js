import React, { useEffect, useState } from "react";
import IssuesCard from "./IssuesCard";
import IssuesTags from "./IssuesTags";

export default function CommunityProfile({
  selectedSpecificIssue,
  issues,
  communities,
  communitySearch,
  setSelectedSpecificIssue,
  compareSearch,
  setMoreIssues,
  moreIssuesLength,
  moreIssues,
  setMoreIssuesLength,
  boundary,
  councils,
}) {
  useEffect(() => {
    if (boundary === "community") {
      if (
        selectedSpecificIssue &&
        communitySearch &&
        ((communities[communitySearch] &&
          !communities[communitySearch].least_performing_issues.includes(
            selectedSpecificIssue
          ) &&
          !moreIssues.includes(selectedSpecificIssue)) ||
          (councils[communitySearch] &&
            !councils[communitySearch].least_performing_issues.includes(
              selectedSpecificIssue
            ) &&
            !moreIssues.includes(selectedSpecificIssue)))
      ) {
        let newMoreIssues = moreIssues;
        newMoreIssues.push(selectedSpecificIssue);
        setMoreIssues(newMoreIssues);
        setMoreIssuesLength(moreIssuesLength + 1);
      }
    }

    /* if (boundary === "council") {
            if (selectedSpecificIssue && communitySearch && !councils[communitySearch].least_performing_issues.includes(selectedSpecificIssue) && !moreIssues.includes(selectedSpecificIssue)) {
                let newMoreIssues = moreIssues;
                newMoreIssues.push(selectedSpecificIssue);
                setMoreIssues(newMoreIssues)
                setMoreIssuesLength(moreIssuesLength+1)
            }
        }*/
  }, [selectedSpecificIssue]);

  const [modal, setModal] = useState(null);

  //   console.log(communitySearch);
  // console.log(communities[communitySearch]);
  //   console.log(${councils[communitySearch].borough})

  return (
    <div className={"community-profile-container"}>
      <div className={"issues-tile-header"}></div>
      {!compareSearch ? (
        <>
          <div className={"standard-padding"}>
            {
              <h5 className={"mb-3"}>
                Notable Indicators—{" "}
                {communitySearch
                  ? boundary == "council"
                    ? councils[communitySearch]
                      ? `City Council ${councils[communitySearch].name}`
                      : ""
                    : communities[communitySearch]
                    ? `${communities[communitySearch].name
                        .split(" ")
                        .slice(0, -1)} Community Board ${communities[
                        communitySearch
                      ].name
                        .split(" ")
                        .slice(-1)}`
                    : ""
                  : ""}
              </h5>
            }
            <p className={"mt-3"}>
              A few sentences on how these topics of interest were selected. A
              few sentences on how these topics of interest were selected.
            </p>

            <div className={"d-flex flex-column row-gap"}>
              {(communities[communitySearch] &&
                communities[communitySearch].least_performing_issues.map(
                  (issue, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          selectedSpecificIssue &&
                          selectedSpecificIssue !== issue
                            ? "opacity-50"
                            : ""
                        }
                      >
                        <IssuesCard
                          selectedSpecificIssue={selectedSpecificIssue}
                          setSelectedSpecificIssue={setSelectedSpecificIssue}
                          issues={issues}
                          specificIssue={issue}
                          setModal={setModal}
                        />
                      </div>
                    );
                  }
                )) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues.map(
                    (issue, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            selectedSpecificIssue &&
                            selectedSpecificIssue !== issue
                              ? "opacity-50"
                              : ""
                          }
                        >
                          <IssuesCard
                            selectedSpecificIssue={selectedSpecificIssue}
                            setSelectedSpecificIssue={setSelectedSpecificIssue}
                            issues={issues}
                            specificIssue={issue}
                            setModal={setModal}
                          />
                        </div>
                      );
                    }
                  ))}
            </div>
          </div>

          <div className={"standard-padding"}>
            <h5 className={"mb-3"}>More Issues</h5>

            <IssuesTags
              issues={issues}
              leastPerforming={
                (communities[communitySearch] &&
                  communities[communitySearch].least_performing_issues) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues)
              }
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              councils={councils}
              setModal={setModal}
              moreIssues={moreIssues}
              setMoreIssues={setMoreIssues}
              moreIssuesLength={moreIssuesLength}
              setMoreIssuesLength={setMoreIssuesLength}
              compareSearch={compareSearch}
              communitySearch={communitySearch}
            />
          </div>
        </>
      ) : (
        <>
          <div className={"standard-padding"}>
            {
              <h5 className={"mb-3"}>
                Topic of Interests -{" "}
                {(communities[communitySearch] &&
                  communities[communitySearch].bolded_text) ||
                  (councils[communitySearch] &&
                    councils[communitySearch].bolded_text)}{" "}
                &{" "}
                {(communities[compareSearch] &&
                  communities[compareSearch].bolded_text) ||
                  (councils[compareSearch] &&
                    councils[compareSearch].bolded_text)}
              </h5>
            }
            <p className={"mt-3"}>
              A few sentences on how these topics of interest were selected. A
              few sentences on how these topics of interest were selected.{" "}
            </p>

            <IssuesTags
              issues={issues}
              leastPerforming={
                (communities[communitySearch] &&
                  communities[communitySearch].least_performing_issues) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues)
              }
              communities={communities}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              setModal={setModal}
              moreIssues={moreIssues}
              setMoreIssues={setMoreIssues}
              moreIssuesLength={moreIssuesLength}
              setMoreIssuesLength={setMoreIssuesLength}
              compareSearch={compareSearch}
              communitySearch={communitySearch}
            />
          </div>
        </>
      )}

      {modal && (
        <div className="modal-background">
          <div className={"modal-card"}>
            <IssuesCard
              selectedSpecificIssue={selectedSpecificIssue}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              issues={issues}
              specificIssue={modal}
              setModal={setModal}
              modalVersion={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
