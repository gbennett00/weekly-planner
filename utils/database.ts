import { createClient } from "./supabase/client";

const supabase = createClient();

// Generic database interface
interface Database {
  getCommitments(week: Date): Promise<string[]>;
  addCommitment(week: Date, commitment: string): Promise<void>;
  getWeeks(): Promise<Date[]>;
  createWeek(week: string): Promise<void>;
}

// Supabase implementation of the Database interface
const SupabaseDatabase: Database = {
  async getCommitments(week: Date): Promise<string[]> {
    const { data, error } = await supabase.from("commitments").select("commitment").eq("week", week);

    if (error) {
      console.error("Error fetching commitments:", error.message);
      return [];
    }

    return data.map((row: { commitment: string }) => row.commitment);
  },

  async addCommitment(week: Date, commitment: string): Promise<void> {
    const { error } = await supabase.from("commitments").insert([{ week, commitment }]);
    if (error) {
      console.error("Error adding commitment:", error.message);
    }
  },

  async getWeeks(): Promise<Date[]> {
    const { data, error } = await supabase.from("weeks").select("startDate");
    if (error) {
      console.error("Error fetching weeks:", error.message);
      return [];
    }

    return data.map((row: { startDate: string }) => new Date(row.startDate));
  },

  async createWeek(week: string): Promise<void> {
    const { error } = await supabase.from("weeks").insert([{ week }]);
    if (error) {
      console.error("Error creating week:", error.message);
    }
  },
};

export default SupabaseDatabase;
