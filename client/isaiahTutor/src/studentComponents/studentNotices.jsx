function StudentNotices() {
    return (
        <div className="mt-3 w-100 p-2 bg-light rounded user-select-none">
            <h2>Notices</h2>
            <div className="alert alert-primary mt-3" role="alert">
                <h5 className="alert-heading">Submitting Homework</h5>
                <p>Submissions are only open when the status of the app is online, you can check this by looking below. Submissions will always be open around the following times:</p>
                <p><b>Saturday: </b>8pm</p>
                <p><b>Sunday: </b>8pm</p>
                <p>If you want to submit another time just contact me and I'll open it ASAP but with that in mind try finish your homework before Sunday night each week</p>
            </div>
        </div>
    )
}

export default StudentNotices