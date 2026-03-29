const chartPalette = [
    "#36A2EB",
    "#FF6384",
    "#FF9F40",
    "#4BC0C0",
    "#9966FF",
    "#FFCD56",
    "#C9CBCF"
];

export function colorForAttendee(attendee: string, attendees: string[]): string {
    const orderedAttendees = [...new Set(attendees)].sort((left, right) => left.localeCompare(right));
    const attendeeIndex = orderedAttendees.indexOf(attendee);

    if (attendeeIndex === -1) {
        return chartPalette[0];
    }

    return chartPalette[attendeeIndex % chartPalette.length];
}
