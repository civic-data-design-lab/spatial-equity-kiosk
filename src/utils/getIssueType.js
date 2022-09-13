export const getIssueType = (
    issues,
    selectedSpecificIssue
) => {
    if (issues.issues_data['health'].specific_issues_ID.includes(selectedSpecificIssue)) return ('health');
    if (issues.issues_data['environment'].specific_issues_ID.includes(selectedSpecificIssue)) return ('env');
    if (issues.issues_data['infrastructure'].specific_issues_ID.includes(selectedSpecificIssue)) return ('infra');
    return null;
};