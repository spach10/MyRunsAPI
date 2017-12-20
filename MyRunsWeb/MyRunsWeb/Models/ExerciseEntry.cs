namespace MyRunsWeb.Models
{
    public class ExerciseEntry
    {
        public int id { get; set; }
        public int mInput_type { get; set; }
        public int mActivity_type { get; set; }
        public string mDateTime { get; set; }
        public string mTime { get; set; }
        public double mDuration { get; set; }
        public double mDistance { get; set; }
        public double mAvg_pace { get; set; }
        public double mAvg_speed { get; set; }
        public int mCalorie { get; set; }
        public int mClimb { get; set; }
        public string mComment { get; set; }
    }
}
