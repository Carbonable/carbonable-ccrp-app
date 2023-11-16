import { config } from "./config";
import { createClient } from '@sanity/client';

// Standard client for fetching data
export const client = createClient(config)
