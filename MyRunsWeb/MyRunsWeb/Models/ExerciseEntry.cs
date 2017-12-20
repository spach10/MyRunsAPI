namespace MyRunsWeb.Models
{
    public class ExerciseEntry
    {
        internal int id { get; set; }
        internal int mInput_type { get; set; }
        internal int mActivity_type { get; set; }
        internal string mDateTime { get; set; }
        internal string mTime { get; set; }
        internal double mDuration { get; set; }
        internal double mDistance { get; set; }
        internal double mAvg_pace { get; set; }
        internal double mAvg_speed { get; set; }
        internal int mCalorie { get; set; }
        internal int mClimb { get; set; }
        internal string mComment { get; set; }
    }
}
