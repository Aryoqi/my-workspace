/**
 * Supabase Client & Real-Time Sync Service for My Workspace
 * Provides authentication (Sign Up / Sign In / Passwords) and real-time database sync on the free tier.
 */

class CloudBackendService {
  constructor() {
    this.STORAGE_KEY = "my_workspace_supabase_config";
    this.client = null;
    this.user = null;
    this.isConnected = false;
    this.activeChannelSubscription = null;

    this.loadConfig();
    this.initClient();
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const DEFAULT_CLOUD_URL = "https://kfcvbvfirnaobltzfjxf.supabase.co";
      const DEFAULT_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmY3ZidmZpcm5hb2JsdHpmanhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0NjI3MTMsImV4cCI6MjExMTAzODcxM30.M7yr1eGgfO1ecyLyaPn_OrUYM8qGMXxLXLTC47pdbdA";

      if (saved) {
        this.config = JSON.parse(saved);
        if (!this.config.url) this.config.url = DEFAULT_CLOUD_URL;
        if (!this.config.anonKey) this.config.anonKey = DEFAULT_ANON_KEY;
        this.config.isConfigured = true;
      } else {
        // Pre-configured live project credentials
        this.config = {
          url: DEFAULT_CLOUD_URL,
          anonKey: DEFAULT_ANON_KEY,
          isConfigured: true
        };
      }
    } catch (e) {
      this.config = { url: "", anonKey: "", isConfigured: false };
    }
  }

  saveConfig(url, anonKey) {
    this.config = {
      url: (url || "").trim(),
      anonKey: (anonKey || "").trim(),
      isConfigured: !!((url || "").trim() && (anonKey || "").trim())
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
    this.initClient();
  }

  initClient() {
    if (this.config.isConfigured && typeof window !== "undefined" && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true
          }
        });
        this.isConnected = true;
      } catch (err) {
        console.error("Failed to initialize Supabase client", err);
        this.isConnected = false;
      }
    } else {
      this.client = null;
      this.isConnected = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Authentication
  // ---------------------------------------------------------------------------

  async signUp(email, password, displayName) {
    if (!this.client) {
      // In local demo mode: simulate account creation
      const mockUser = {
        id: "u_" + Date.now(),
        email: email,
        user_metadata: {
          display_name: displayName || email.split("@")[0],
          avatar_color: "#4A154B"
        }
      };
      localStorage.setItem("my_workspace_demo_session", JSON.stringify(mockUser));
      this.user = mockUser;
      return { user: mockUser, error: null };
    }

    try {
      const { data, error } = await this.client.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: displayName,
            avatar_color: this.getRandomColor()
          }
        }
      });
      if (error) return { user: null, error };

      this.user = data.user;
      return { user: data.user, error: null };
    } catch (err) {
      return { user: null, error: err };
    }
  }

  async signIn(email, password) {
    if (!this.client) {
      // In local demo mode: simulate sign in
      const mockUser = {
        id: "u_demo",
        email: email,
        user_metadata: {
          display_name: email.split("@")[0],
          avatar_color: "#611f69"
        }
      };
      localStorage.setItem("my_workspace_demo_session", JSON.stringify(mockUser));
      this.user = mockUser;
      return { user: mockUser, error: null };
    }

    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: email,
        password: password
      });
      if (error) return { user: null, error };

      this.user = data.user;
      return { user: data.user, error: null };
    } catch (err) {
      return { user: null, error: err };
    }
  }

  async signOut() {
    if (this.client) {
      await this.client.auth.signOut();
    }
    localStorage.removeItem("my_workspace_demo_session");
    this.user = null;
  }

  async getCurrentSessionUser() {
    if (this.client) {
      const { data } = await this.client.auth.getUser();
      if (data && data.user) {
        this.user = data.user;
        return data.user;
      }
    }

    // Check demo session
    const demo = localStorage.getItem("my_workspace_demo_session");
    if (demo) {
      try {
        this.user = JSON.parse(demo);
        return this.user;
      } catch (e) {}
    }

    return null;
  }

  getRandomColor() {
    const colors = ["#1264A3", "#2EB67D", "#E01E5A", "#4A154B", "#611F69", "#ECB22E"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // ---------------------------------------------------------------------------
  // Real-Time Database Operations (When Supabase is connected)
  // ---------------------------------------------------------------------------

  async fetchChannels() {
    if (!this.client) return null;
    const { data, error } = await this.client
      .from("channels")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.warn("Could not fetch remote channels, using local", error);
      return null;
    }
    return data;
  }

  async createChannel(name, topic, isPrivate = false) {
    if (!this.client) return null;
    const { data, error } = await this.client
      .from("channels")
      .insert([
        {
          name: name,
          topic: topic,
          is_private: isPrivate,
          created_by: this.user?.id
        }
      ])
      .select()
      .single();
    if (error) {
      console.error("Failed to create remote channel", error);
      return null;
    }
    return data;
  }

  async fetchMessages(channelId) {
    if (!this.client) return null;
    const { data, error } = await this.client
      .from("messages")
      .select("*")
      .eq("channel_id", channelId)
      .order("created_at", { ascending: true });
    if (error) {
      console.warn("Could not fetch remote messages", error);
      return null;
    }
    return data;
  }

  async postMessage(channelId, text, attachment = null) {
    if (!this.client) return null;
    const profile = this.user?.user_metadata || {};
    const { data, error } = await this.client
      .from("messages")
      .insert([
        {
          channel_id: channelId,
          user_id: this.user?.id,
          user_name: profile.display_name || this.user?.email,
          user_avatar: profile.avatar_color || "#4A154B",
          text: text,
          attachment: attachment
        }
      ])
      .select()
      .single();
    if (error) {
      console.error("Failed to post remote message", error);
      return null;
    }
    return data;
  }

  // Real-Time Subscription Listener
  subscribeToChannel(channelId, onNewMessage) {
    if (!this.client) return;

    if (this.activeChannelSubscription) {
      this.client.removeChannel(this.activeChannelSubscription);
    }

    this.activeChannelSubscription = this.client
      .channel(`public:messages:channel_id=eq.${channelId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `channel_id=eq.${channelId}`
        },
        payload => {
          if (onNewMessage && payload.new) {
            onNewMessage(payload.new);
          }
        }
      )
      .subscribe();
  }
}

// Global Cloud Service Instance
window.cloudService = new CloudBackendService();
