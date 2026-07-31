// Synthetic sample dataset in the same schema as the weekly CRM 'Leads' export,
// including Planned Term and Enrollment Advisor.
const SAMPLE_CSV = `Account,Program,Short Name (Program) (Program),Status Reason,Lead Channel,Lead Source,Created On,Contacted Date,Interview Completed Date,Evaluation Completed Date,File Completed Date,Planned Term,Enrollment Advisor
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,None,2026-08-02 16:21:00,2026-08-05 16:21:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,LinkedIn,2026-07-07 07:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,SEO,None,2026-06-29 12:23:00,2026-07-02 12:23:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,None,2026-07-02 17:08:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-08-02 16:35:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,SEO,None,2026-06-24 09:40:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-06-28 13:53:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-07-24 12:58:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,PPC,Google,2026-06-17 18:08:00,2026-06-20 02:08:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,SEO,None,2026-07-27 16:47:00,2026-07-27 23:47:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,05 - Interview Completed,Creative,None,2026-06-29 13:29:00,2026-07-01 13:29:00,2026-07-04 21:29:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Facebook,2026-06-20 10:16:00,2026-06-21 20:16:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Creative,None,2026-07-24 20:54:00,2026-07-25 05:54:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,LinkedIn,2026-06-26 09:16:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,Creative,None,2026-07-16 12:12:00,2026-07-17 14:12:00,2026-07-21 22:12:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-06-28 13:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-06-22 08:09:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,08 - File Complete,PPC,None,2026-08-01 08:14:00,2026-08-01 13:14:00,2026-08-04 20:14:00,2026-08-05 22:14:00,2026-08-06 04:14:00,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,SEO,None,2026-07-27 13:14:00,2026-07-29 18:14:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-07-15 13:31:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,08 - File Complete,PPC,LinkedIn,2026-06-28 09:11:00,2026-06-29 19:11:00,2026-07-02 19:11:00,2026-07-05 22:11:00,2026-07-08 22:11:00,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,None,2026-07-14 12:46:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,08 - File Complete,PPC,Google,2026-07-11 20:39:00,2026-07-12 23:39:00,2026-07-16 05:39:00,2026-07-16 10:39:00,2026-07-19 14:39:00,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,Traditional,None,2026-08-01 15:33:00,2026-08-03 18:33:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,Referral,None,2026-07-23 16:53:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,01 - New,Traditional,None,2026-07-11 09:29:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-06-17 15:34:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,Referral,None,2026-07-13 11:38:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,None,2026-07-26 18:37:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,LinkedIn,2026-07-01 14:45:00,2026-07-04 17:45:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,Referral,None,2026-07-06 15:11:00,2026-07-09 16:11:00,2026-07-13 17:11:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,03 - Contacted,Referral,None,2026-07-20 17:15:00,2026-07-20 21:15:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,SEO,None,2026-07-01 20:55:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Facebook,2026-07-13 13:45:00,2026-07-16 20:45:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,01 - New,Creative,None,2026-06-16 10:24:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,PPC,Google,2026-07-02 15:20:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,Creative,None,2026-07-26 14:30:00,2026-07-27 18:30:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Education,MED,01 - New,PPC,Google,2026-07-05 16:53:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,01 - New,Traditional,None,2026-06-27 18:30:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,LinkedIn,2026-07-14 12:38:00,2026-07-14 16:38:00,2026-07-18 19:38:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,LinkedIn,2026-07-07 16:01:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,Facebook,2026-07-08 09:52:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,PPC,Google,2026-07-24 16:34:00,2026-07-24 22:34:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,Creative,None,2026-07-26 20:13:00,2026-07-30 03:13:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,01 - New,Traditional,None,2026-07-31 18:03:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,05 - Interview Completed,Referral,None,2026-07-29 18:05:00,2026-07-31 20:05:00,2026-08-04 22:05:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-07-11 18:42:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,None,2026-07-28 11:33:00,2026-07-29 11:33:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-07-13 12:02:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,LinkedIn,2026-07-24 11:03:00,2026-07-26 18:03:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,01 - New,SEO,None,2026-06-24 08:01:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-07 13:48:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Facebook,2026-07-02 15:03:00,2026-07-03 15:03:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-07-17 12:59:00,2026-07-20 22:59:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-07-12 17:32:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,Facebook,2026-07-13 12:19:00,2026-07-14 13:19:00,2026-07-14 20:19:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Google,2026-06-22 13:26:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,08 - File Complete,PPC,None,2026-07-24 14:30:00,2026-07-26 00:30:00,2026-07-27 00:30:00,2026-07-27 01:30:00,2026-07-28 05:30:00,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,None,2026-07-24 14:08:00,2026-07-26 14:08:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,Creative,None,2026-07-24 07:42:00,2026-07-24 14:42:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Referral,None,2026-06-22 15:58:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Data Science,MDS,05 - Interview Completed,PPC,LinkedIn,2026-06-17 16:29:00,2026-06-18 22:29:00,2026-06-20 02:29:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,Creative,None,2026-07-23 07:21:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,PPC,LinkedIn,2026-07-04 10:04:00,2026-07-07 13:04:00,2026-07-10 13:04:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,Google,2026-06-21 14:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,08 - File Complete,PPC,LinkedIn,2026-07-03 17:48:00,2026-07-03 20:48:00,2026-07-04 02:48:00,2026-07-07 03:48:00,2026-07-08 07:48:00,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,Referral,None,2026-07-09 07:25:00,2026-07-11 17:25:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,PPC,Facebook,2026-07-30 20:16:00,2026-08-02 05:16:00,2026-08-02 07:16:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,08 - File Complete,Referral,None,2026-07-26 16:31:00,2026-07-27 01:31:00,2026-07-30 05:31:00,2026-07-30 06:31:00,2026-07-30 07:31:00,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-07-17 08:51:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,Referral,None,2026-07-13 10:18:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,01 - New,Traditional,None,2026-06-19 11:45:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-07-31 16:37:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Google,2026-07-18 14:13:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Facebook,2026-07-13 10:56:00,2026-07-13 12:56:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,Referral,None,2026-07-19 07:37:00,2026-07-20 14:37:00,2026-07-21 15:37:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,08 - File Complete,Referral,None,2026-07-19 11:19:00,2026-07-21 18:19:00,2026-07-22 00:19:00,2026-07-22 01:19:00,2026-07-25 03:19:00,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,LinkedIn,2026-07-02 19:55:00,2026-07-05 21:55:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,LinkedIn,2026-07-30 10:35:00,2026-08-01 20:35:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,PPC,LinkedIn,2026-07-30 16:40:00,2026-08-01 21:40:00,2026-08-05 04:40:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,Referral,None,2026-08-01 18:36:00,2026-08-04 19:36:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,None,2026-07-19 19:36:00,2026-07-21 22:36:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,LinkedIn,2026-06-17 08:20:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,Traditional,None,2026-06-30 11:22:00,2026-06-30 19:22:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Google,2026-07-31 08:48:00,2026-08-02 18:48:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,None,2026-07-30 13:40:00,2026-08-01 16:40:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,LinkedIn,2026-06-15 17:44:00,2026-06-18 22:44:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-07-27 19:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-26 07:49:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,Referral,None,2026-07-30 15:49:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-06-19 07:59:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,01 - New,PPC,Google,2026-07-10 14:04:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,PPC,LinkedIn,2026-07-21 12:00:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,Creative,None,2026-07-26 16:37:00,2026-07-29 17:37:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,01 - New,Referral,None,2026-07-07 20:04:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,None,2026-06-19 19:36:00,2026-06-20 20:36:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,SEO,None,2026-06-28 20:23:00,2026-07-01 21:23:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-07-25 07:23:00,2026-07-26 07:23:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,Referral,None,2026-07-19 15:15:00,2026-07-21 18:15:00,2026-07-25 23:15:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Facebook,2026-06-30 18:40:00,2026-07-03 01:40:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Facebook,2026-07-31 07:12:00,2026-08-01 14:12:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,05 - Interview Completed,Referral,None,2026-06-30 14:23:00,2026-06-30 14:23:00,2026-07-04 18:23:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-07-12 20:16:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Facebook,2026-06-18 07:14:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,None,2026-07-08 18:15:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,SEO,None,2026-06-26 18:58:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-06-29 20:06:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,None,2026-06-16 13:34:00,2026-06-19 13:34:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-08-01 19:13:00,2026-08-03 00:13:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,LinkedIn,2026-06-20 14:31:00,2026-06-22 17:31:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Referral,None,2026-06-21 08:45:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,Referral,None,2026-06-29 19:25:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Education,MED,03 - Contacted,SEO,None,2026-07-31 11:24:00,2026-08-01 19:24:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,Traditional,None,2026-07-06 18:14:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,08 - File Complete,PPC,None,2026-06-28 07:20:00,2026-06-29 16:20:00,2026-07-03 00:20:00,2026-07-04 02:20:00,2026-07-06 07:20:00,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,SEO,None,2026-06-29 14:37:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,Facebook,2026-07-02 20:00:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,None,2026-07-16 09:24:00,2026-07-18 09:24:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-07-01 18:40:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Google,2026-08-02 08:32:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,Referral,None,2026-06-15 13:59:00,2026-06-16 23:59:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,Facebook,2026-06-26 11:10:00,2026-06-26 15:10:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Finance,MAF,01 - New,Traditional,None,2026-07-23 08:26:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,06 - Pending Application,PPC,None,2026-07-16 15:36:00,2026-07-18 21:36:00,2026-07-19 04:36:00,2026-07-20 06:36:00,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-07-15 17:03:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,Creative,None,2026-06-29 11:32:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,Creative,None,2026-07-23 08:41:00,2026-07-23 17:41:00,2026-07-27 19:41:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Facebook,2026-07-09 18:59:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Google,2026-06-16 08:13:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Facebook,2026-07-04 16:15:00,2026-07-06 22:15:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Data Science,MDS,08 - File Complete,PPC,Google,2026-06-27 13:43:00,2026-06-30 21:43:00,2026-07-01 04:43:00,2026-07-01 06:43:00,2026-07-02 06:43:00,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,SEO,None,2026-07-08 19:46:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Google,2026-07-24 11:09:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,01 - New,Creative,None,2026-06-15 14:30:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,PPC,Google,2026-06-23 18:29:00,2026-06-24 19:29:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Facebook,2026-07-02 11:03:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,Creative,None,2026-06-26 08:15:00,2026-06-29 08:15:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,03 - Contacted,SEO,None,2026-07-02 11:37:00,2026-07-04 13:37:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,05 - Interview Completed,Referral,None,2026-06-20 18:47:00,2026-06-22 03:47:00,2026-06-23 09:47:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,Google,2026-06-30 15:00:00,2026-07-04 01:00:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-06-23 15:21:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Marketing,MMKTG,01 - New,Creative,None,2026-07-19 19:27:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,Creative,None,2026-06-17 11:58:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Referral,None,2026-06-22 11:15:00,2026-06-22 18:15:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,LinkedIn,2026-06-19 18:23:00,2026-06-20 19:23:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,PPC,Facebook,2026-07-12 10:53:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-06-27 08:19:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Facebook,2026-06-29 16:09:00,2026-07-02 00:09:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,None,2026-06-29 08:41:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,PPC,Facebook,2026-07-29 09:14:00,2026-07-31 16:14:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Creative,None,2026-07-29 13:29:00,2026-07-29 19:29:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,05 - Interview Completed,SEO,None,2026-06-30 18:13:00,2026-07-03 18:13:00,2026-07-03 22:13:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,PPC,Google,2026-06-16 14:16:00,2026-06-18 20:16:00,2026-06-18 23:16:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,Referral,None,2026-06-24 11:25:00,2026-06-27 21:25:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-12 14:22:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Referral,None,2026-06-19 09:06:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-23 12:35:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,08 - File Complete,Creative,None,2026-07-27 17:17:00,2026-07-29 03:17:00,2026-08-01 09:17:00,2026-08-01 14:17:00,2026-08-01 17:17:00,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,None,2026-07-20 19:03:00,2026-07-23 01:03:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,LinkedIn,2026-07-18 08:10:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-06-26 12:33:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,SEO,None,2026-07-17 08:43:00,2026-07-20 09:43:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-07-16 07:44:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Education,MED,01 - New,PPC,LinkedIn,2026-07-30 20:46:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Education,MED,05 - Interview Completed,Referral,None,2026-07-19 12:07:00,2026-07-21 22:07:00,2026-07-24 04:07:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,PPC,None,2026-07-17 09:19:00,2026-07-19 10:19:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Facebook,2026-08-01 10:16:00,2026-08-01 20:16:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,Referral,None,2026-07-07 20:27:00,2026-07-09 22:27:00,2026-07-14 00:27:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,05 - Interview Completed,PPC,Facebook,2026-06-26 14:51:00,2026-06-28 14:51:00,2026-06-29 22:51:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,PPC,Facebook,2026-07-07 19:49:00,2026-07-07 23:49:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Education,MED,01 - New,Creative,None,2026-07-05 18:31:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,Facebook,2026-06-24 12:12:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-07-19 08:47:00,2026-07-21 09:47:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Facebook,2026-07-18 15:20:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-18 17:20:00,2026-06-18 21:20:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Google,2026-07-21 11:09:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,LinkedIn,2026-07-13 13:56:00,2026-07-14 15:56:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-07-13 14:30:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,08 - File Complete,Creative,None,2026-06-30 20:07:00,2026-07-02 21:07:00,2026-07-03 02:07:00,2026-07-05 05:07:00,2026-07-05 11:07:00,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,Google,2026-06-20 13:29:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,PPC,None,2026-07-21 09:04:00,2026-07-21 12:04:00,2026-07-21 17:04:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Facebook,2026-07-03 17:06:00,2026-07-05 17:06:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,SEO,None,2026-07-02 07:13:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-06-28 08:08:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,Facebook,2026-07-22 18:07:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,SEO,None,2026-07-21 16:14:00,2026-07-23 19:14:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,SEO,None,2026-07-26 13:29:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-07-30 10:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,PPC,None,2026-06-17 14:37:00,2026-06-19 21:37:00,2026-06-20 04:37:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,None,2026-07-24 07:40:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,05 - Interview Completed,Creative,None,2026-07-31 19:54:00,2026-07-31 22:54:00,2026-08-03 02:54:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,08 - File Complete,SEO,None,2026-07-23 20:09:00,2026-07-24 04:09:00,2026-07-27 05:09:00,2026-07-27 09:09:00,2026-07-30 13:09:00,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,01 - New,Creative,None,2026-06-21 17:25:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-07-23 20:03:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,Google,2026-07-30 18:37:00,2026-08-02 03:37:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Facebook,2026-08-02 16:38:00,2026-08-03 17:38:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-30 15:18:00,2026-06-30 23:18:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,LinkedIn,2026-06-17 17:24:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Management,MM,03 - Contacted,SEO,None,2026-07-25 11:39:00,2026-07-25 16:39:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,Creative,None,2026-07-16 17:10:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-07-04 16:20:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,SEO,None,2026-07-19 19:52:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,PPC,Google,2026-07-25 15:17:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-30 15:39:00,2026-07-02 18:39:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-07-01 07:36:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-06-28 07:33:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-06-21 12:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-07-22 10:12:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Data Science,MDS,05 - Interview Completed,SEO,None,2026-07-04 09:12:00,2026-07-07 18:12:00,2026-07-10 22:12:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-07-10 16:47:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,None,2026-07-09 15:37:00,2026-07-12 18:37:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,05 - Interview Completed,SEO,None,2026-07-19 20:31:00,2026-07-21 02:31:00,2026-07-21 02:31:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,05 - Interview Completed,PPC,Google,2026-07-24 14:33:00,2026-07-27 15:33:00,2026-07-29 18:33:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,Google,2026-07-17 15:34:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Education,MED,05 - Interview Completed,Creative,None,2026-07-24 10:56:00,2026-07-24 17:56:00,2026-07-25 20:56:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,Google,2026-06-23 15:38:00,2026-06-26 21:38:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Management,MM,01 - New,PPC,LinkedIn,2026-06-27 07:51:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,Referral,None,2026-07-17 07:00:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Google,2026-07-19 12:46:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,08 - File Complete,PPC,None,2026-06-28 11:51:00,2026-06-29 20:51:00,2026-06-30 02:51:00,2026-07-02 08:51:00,2026-07-04 08:51:00,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,None,2026-07-06 14:12:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Education,MED,08 - File Complete,PPC,LinkedIn,2026-07-25 15:22:00,2026-07-28 00:22:00,2026-07-30 06:22:00,2026-07-31 07:22:00,2026-08-01 13:22:00,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,Referral,None,2026-06-17 07:23:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,SEO,None,2026-06-29 09:21:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Google,2026-07-03 11:43:00,2026-07-04 13:43:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-07-14 17:58:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,05 - Interview Completed,PPC,Google,2026-07-12 18:31:00,2026-07-14 18:31:00,2026-07-19 00:31:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-06-19 08:05:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,Referral,None,2026-07-29 08:25:00,2026-07-31 14:25:00,2026-08-02 14:25:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,08 - File Complete,PPC,Facebook,2026-07-09 12:35:00,2026-07-12 14:35:00,2026-07-16 22:35:00,2026-07-18 03:35:00,2026-07-21 09:35:00,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,None,2026-07-12 09:27:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,PPC,LinkedIn,2026-06-23 09:31:00,2026-06-26 14:31:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-07-23 12:51:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-08-02 13:41:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,Google,2026-06-27 11:32:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,LinkedIn,2026-07-14 08:38:00,2026-07-16 14:38:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Facebook,2026-07-27 17:38:00,2026-07-30 18:38:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Google,2026-06-15 11:55:00,2026-06-18 20:55:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Google,2026-06-26 11:42:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,PPC,LinkedIn,2026-07-18 07:07:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-07-30 15:50:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,SEO,None,2026-07-27 19:31:00,2026-07-28 05:31:00,2026-07-30 08:31:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,LinkedIn,2026-07-20 17:33:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,Referral,None,2026-07-18 10:08:00,2026-07-19 18:08:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,08 - File Complete,SEO,None,2026-07-07 18:06:00,2026-07-08 01:06:00,2026-07-12 02:06:00,2026-07-14 04:06:00,2026-07-16 05:06:00,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-07-18 08:04:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,LinkedIn,2026-08-02 11:27:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,PPC,LinkedIn,2026-07-13 15:08:00,2026-07-13 19:08:00,2026-07-18 03:08:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,03 - Contacted,Referral,None,2026-07-12 15:34:00,2026-07-13 16:34:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,Traditional,None,2026-07-25 20:14:00,2026-07-28 22:14:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-06-27 15:01:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,Creative,None,2026-07-24 17:31:00,2026-07-27 01:31:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,LinkedIn,2026-07-19 17:05:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-06-22 16:33:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,Google,2026-07-26 17:09:00,2026-07-27 03:09:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,LinkedIn,2026-08-02 08:32:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-06-20 10:10:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Facebook,2026-07-11 09:33:00,2026-07-12 09:33:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,PPC,None,2026-06-17 10:30:00,2026-06-20 18:30:00,2026-06-22 00:30:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,Traditional,None,2026-07-15 10:59:00,2026-07-18 11:59:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Facebook,2026-06-22 17:45:00,2026-06-23 23:45:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,Facebook,2026-06-15 16:40:00,2026-06-17 21:40:00,2026-06-17 22:40:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Facebook,2026-07-09 08:27:00,2026-07-10 15:27:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,PPC,None,2026-06-19 11:23:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,05 - Interview Completed,PPC,None,2026-07-08 09:59:00,2026-07-11 19:59:00,2026-07-15 19:59:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,None,2026-07-07 17:16:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,SEO,None,2026-07-30 18:14:00,2026-08-02 19:14:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Google,2026-07-24 11:01:00,2026-07-27 20:01:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,Creative,None,2026-06-17 10:49:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,PPC,Facebook,2026-06-15 11:13:00,2026-06-17 15:13:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Management,MM,01 - New,PPC,Facebook,2026-06-29 20:47:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Creative,None,2026-07-02 07:10:00,2026-07-04 13:10:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-06-26 18:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,SEO,None,2026-08-01 08:29:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,SEO,None,2026-07-19 10:21:00,2026-07-19 18:21:00,2026-07-20 21:21:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Facebook,2026-06-16 17:29:00,2026-06-19 23:29:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,Traditional,None,2026-07-18 08:58:00,2026-07-20 11:58:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,06 - Pending Application,PPC,None,2026-06-23 16:29:00,2026-06-24 23:29:00,2026-06-28 05:29:00,2026-06-30 07:29:00,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Google,2026-07-10 08:17:00,2026-07-10 09:17:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,LinkedIn,2026-06-26 10:02:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,PPC,Google,2026-07-08 10:59:00,2026-07-11 11:59:00,2026-07-13 15:59:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,Referral,None,2026-07-22 16:17:00,2026-07-25 23:17:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-07-08 14:50:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Education,MED,03 - Contacted,SEO,None,2026-06-28 08:30:00,2026-06-29 14:30:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,PPC,LinkedIn,2026-06-25 12:14:00,2026-06-27 17:14:00,2026-06-30 23:14:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,Google,2026-08-02 14:31:00,2026-08-02 17:31:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,LinkedIn,2026-07-01 08:01:00,2026-07-03 17:01:00,2026-07-05 00:01:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-07-26 18:09:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,Facebook,2026-06-27 17:30:00,2026-06-27 20:30:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,01 - New,Referral,None,2026-07-11 08:09:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Facebook,2026-06-15 08:02:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-06-17 19:15:00,2026-06-20 21:15:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-07-18 12:30:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,05 - Interview Completed,Creative,None,2026-07-24 16:42:00,2026-07-25 18:42:00,2026-07-25 18:42:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,08 - File Complete,PPC,LinkedIn,2026-07-14 12:07:00,2026-07-17 17:07:00,2026-07-17 22:07:00,2026-07-18 23:07:00,2026-07-19 00:07:00,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,08 - File Complete,PPC,None,2026-06-21 15:39:00,2026-06-22 23:39:00,2026-06-27 01:39:00,2026-06-29 02:39:00,2026-07-01 03:39:00,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,08 - File Complete,PPC,LinkedIn,2026-07-13 08:01:00,2026-07-15 14:01:00,2026-07-19 16:01:00,2026-07-19 19:01:00,2026-07-20 22:01:00,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,Facebook,2026-08-01 11:01:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Google,2026-07-21 14:28:00,2026-07-24 17:28:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-06-24 18:39:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Google,2026-07-05 14:07:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,Traditional,None,2026-07-19 11:07:00,2026-07-21 21:07:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Referral,None,2026-06-15 20:31:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-07-27 20:21:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,LinkedIn,2026-06-17 18:54:00,2026-06-18 01:54:00,2026-06-21 05:54:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-07-18 11:35:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,SEO,None,2026-06-23 17:28:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Facebook,2026-07-01 20:33:00,2026-07-04 02:33:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,Google,2026-06-28 16:38:00,2026-06-29 01:38:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,Google,2026-07-25 13:21:00,2026-07-27 17:21:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-07-08 15:21:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Google,2026-06-25 19:58:00,2026-06-28 00:58:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,01 - New,PPC,LinkedIn,2026-07-10 17:06:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,None,2026-07-20 12:38:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,Creative,None,2026-06-16 08:08:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Management,MM,03 - Contacted,SEO,None,2026-07-03 18:53:00,2026-07-07 03:53:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Management,MM,01 - New,Referral,None,2026-07-03 17:27:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,Facebook,2026-06-17 17:57:00,2026-06-19 22:57:00,2026-06-23 00:57:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,Referral,None,2026-07-02 14:02:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,LinkedIn,2026-07-06 10:50:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-07-16 17:30:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,05 - Interview Completed,PPC,LinkedIn,2026-07-02 12:52:00,2026-07-02 13:52:00,2026-07-05 16:52:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-07-31 11:47:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,LinkedIn,2026-06-28 07:42:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,01 - New,Referral,None,2026-06-27 20:59:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,05 - Interview Completed,PPC,LinkedIn,2026-07-19 13:00:00,2026-07-20 14:00:00,2026-07-24 16:00:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-21 09:06:00,2026-06-21 18:06:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-07-30 18:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,05 - Interview Completed,Creative,None,2026-07-15 09:57:00,2026-07-16 11:57:00,2026-07-16 13:57:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,SEO,None,2026-07-18 16:57:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,PPC,Facebook,2026-07-25 09:35:00,2026-07-28 13:35:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Google,2026-07-28 14:48:00,2026-07-28 15:48:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,None,2026-07-29 12:47:00,2026-08-01 22:47:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,03 - Contacted,SEO,None,2026-07-09 17:15:00,2026-07-10 21:15:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,LinkedIn,2026-06-15 17:12:00,2026-06-16 00:12:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,Creative,None,2026-06-28 20:51:00,2026-07-02 04:51:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,PPC,Google,2026-06-24 18:37:00,2026-06-27 23:37:00,2026-07-01 01:37:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Google,2026-07-03 08:47:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,08 - File Complete,PPC,None,2026-07-10 17:04:00,2026-07-10 19:04:00,2026-07-11 00:04:00,2026-07-13 05:04:00,2026-07-15 06:04:00,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,Facebook,2026-07-03 12:27:00,2026-07-04 16:27:00,2026-07-07 21:27:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-07-07 18:21:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,SEO,None,2026-07-26 17:13:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,PPC,Facebook,2026-07-10 11:31:00,2026-07-12 11:31:00,2026-07-13 18:31:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Google,2026-07-18 13:55:00,2026-07-18 19:55:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,Referral,None,2026-07-17 07:18:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,06 - Pending Application,SEO,None,2026-07-08 11:35:00,2026-07-10 11:35:00,2026-07-12 19:35:00,2026-07-15 20:35:00,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Facebook,2026-06-19 19:06:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,LinkedIn,2026-07-06 09:48:00,2026-07-08 14:48:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Facebook,2026-07-27 11:36:00,2026-07-29 14:36:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,Creative,None,2026-06-15 15:38:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,Facebook,2026-07-07 09:30:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,LinkedIn,2026-07-26 10:04:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-18 18:44:00,2026-06-19 02:44:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Creative,None,2026-07-11 19:05:00,2026-07-13 01:05:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,Traditional,None,2026-07-10 08:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-06-28 16:05:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Education,MED,01 - New,PPC,Google,2026-06-15 12:08:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,None,2026-06-25 09:24:00,2026-06-27 14:24:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,Google,2026-07-18 15:57:00,2026-07-21 18:57:00,2026-07-21 23:57:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,None,2026-07-19 19:32:00,2026-07-22 01:32:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,SEO,None,2026-07-03 15:19:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Data Science,MDS,05 - Interview Completed,PPC,Google,2026-07-29 08:41:00,2026-07-30 15:41:00,2026-08-02 17:41:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,Referral,None,2026-07-31 19:31:00,2026-08-02 00:31:00,2026-08-05 08:31:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,PPC,LinkedIn,2026-06-20 13:03:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,PPC,LinkedIn,2026-06-15 19:05:00,2026-06-18 02:05:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,PPC,None,2026-07-16 12:16:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,None,2026-06-20 10:44:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,03 - Contacted,Traditional,None,2026-07-02 08:09:00,2026-07-03 12:09:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-07-30 20:57:00,2026-08-02 00:57:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,LinkedIn,2026-07-11 17:35:00,2026-07-14 01:35:00,2026-07-14 03:35:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Google,2026-07-08 13:00:00,2026-07-10 21:00:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,05 - Interview Completed,Referral,None,2026-06-23 17:13:00,2026-06-27 02:13:00,2026-06-30 07:13:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,Referral,None,2026-07-22 17:01:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,Referral,None,2026-06-27 12:55:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-07-04 10:23:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-28 18:12:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,Creative,None,2026-07-17 17:48:00,2026-07-19 20:48:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,LinkedIn,2026-07-29 15:32:00,2026-07-31 22:32:00,2026-08-02 01:32:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Finance,MAF,08 - File Complete,PPC,Facebook,2026-07-23 17:02:00,2026-07-26 18:02:00,2026-07-26 18:02:00,2026-07-28 19:02:00,2026-07-29 01:02:00,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-06-18 15:12:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,LinkedIn,2026-07-28 09:26:00,2026-07-29 19:26:00,2026-08-01 20:26:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,08 - File Complete,Traditional,None,2026-06-24 18:49:00,2026-06-25 22:49:00,2026-06-27 02:49:00,2026-06-28 06:49:00,2026-06-30 08:49:00,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,LinkedIn,2026-06-18 12:41:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,Creative,None,2026-07-25 17:01:00,2026-07-28 00:01:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,08 - File Complete,PPC,Facebook,2026-06-23 16:49:00,2026-06-24 18:49:00,2026-06-27 02:49:00,2026-06-30 07:49:00,2026-07-02 07:49:00,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,Referral,None,2026-07-04 17:28:00,2026-07-07 02:28:00,2026-07-09 05:28:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,SEO,None,2026-07-04 13:10:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Referral,None,2026-06-29 19:09:00,2026-06-30 00:09:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Management,MM,01 - New,PPC,LinkedIn,2026-07-29 18:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-06-19 17:10:00,2026-06-19 20:10:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,SEO,None,2026-07-27 12:29:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,SEO,None,2026-07-16 18:23:00,2026-07-18 03:23:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,Creative,None,2026-07-08 09:15:00,2026-07-10 18:15:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Facebook,2026-07-12 08:53:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,01 - New,Creative,None,2026-07-20 13:45:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,Facebook,2026-06-23 13:22:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,PPC,Google,2026-06-17 09:41:00,2026-06-18 15:41:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,Facebook,2026-07-13 15:55:00,2026-07-16 18:55:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,01 - New,SEO,None,2026-06-16 16:31:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Creative,None,2026-07-06 18:22:00,2026-07-09 20:22:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,SEO,None,2026-07-11 14:27:00,2026-07-11 22:27:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,LinkedIn,2026-06-22 09:46:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,PPC,LinkedIn,2026-07-31 16:26:00,2026-08-03 16:26:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-07-26 20:18:00,2026-07-27 06:18:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,LinkedIn,2026-07-30 14:26:00,2026-07-30 19:26:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,01 - New,Referral,None,2026-07-06 10:23:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,Traditional,None,2026-07-22 20:05:00,2026-07-25 23:05:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-07-30 15:39:00,2026-07-31 17:39:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,Referral,None,2026-08-02 11:23:00,2026-08-02 21:23:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Management,MM,03 - Contacted,Creative,None,2026-07-06 12:21:00,2026-07-08 19:21:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,SEO,None,2026-06-22 11:27:00,2026-06-24 20:27:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Education,MED,08 - File Complete,SEO,None,2026-08-01 10:12:00,2026-08-01 12:12:00,2026-08-03 18:12:00,2026-08-05 20:12:00,2026-08-06 23:12:00,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Google,2026-07-09 10:02:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,08 - File Complete,PPC,Facebook,2026-07-16 07:58:00,2026-07-17 17:58:00,2026-07-20 21:58:00,2026-07-20 23:58:00,2026-07-21 00:58:00,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,PPC,None,2026-07-09 17:26:00,2026-07-10 01:26:00,2026-07-11 01:26:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,LinkedIn,2026-07-30 19:32:00,2026-07-31 01:32:00,2026-07-31 07:32:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-07-13 14:14:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,None,2026-06-29 11:04:00,2026-07-02 11:04:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Google,2026-07-25 12:44:00,2026-07-25 18:44:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-08-02 09:05:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,Referral,None,2026-07-29 07:43:00,2026-08-01 16:43:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Facebook,2026-07-25 08:36:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,SEO,None,2026-07-04 20:35:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,SEO,None,2026-06-15 07:39:00,2026-06-15 12:39:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Marketing,MMKTG,08 - File Complete,PPC,LinkedIn,2026-07-15 12:24:00,2026-07-16 19:24:00,2026-07-17 21:24:00,2026-07-18 01:24:00,2026-07-19 03:24:00,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,01 - New,Referral,None,2026-07-07 17:15:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,08 - File Complete,PPC,None,2026-06-17 15:11:00,2026-06-17 19:11:00,2026-06-18 19:11:00,2026-06-21 22:11:00,2026-06-21 23:11:00,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-07-17 12:25:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,SEO,None,2026-07-31 17:35:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Education,MED,05 - Interview Completed,Creative,None,2026-06-26 17:05:00,2026-06-26 22:05:00,2026-06-29 05:05:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,SEO,None,2026-07-15 18:20:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-06-21 14:28:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,01 - New,SEO,None,2026-06-22 18:42:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,Facebook,2026-07-11 11:28:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Education,MED,01 - New,PPC,Facebook,2026-07-31 15:30:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,None,2026-07-17 19:34:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,SEO,None,2026-07-16 18:41:00,2026-07-16 21:41:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,SEO,None,2026-06-28 16:24:00,2026-06-29 00:24:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,None,2026-07-11 20:04:00,2026-07-14 02:04:00,2026-07-15 06:04:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,Google,2026-06-27 13:38:00,2026-06-29 15:38:00,2026-07-03 17:38:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,Facebook,2026-07-10 17:47:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Education,MED,01 - New,PPC,Google,2026-06-22 17:25:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Education,MED,03 - Contacted,Traditional,None,2026-07-14 14:23:00,2026-07-14 15:23:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Google,2026-06-27 08:50:00,2026-06-30 16:50:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,None,2026-07-09 10:43:00,2026-07-12 18:43:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,05 - Interview Completed,PPC,Google,2026-07-16 17:20:00,2026-07-17 02:20:00,2026-07-17 06:20:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,PPC,Facebook,2026-06-18 19:02:00,2026-06-20 02:02:00,2026-06-24 10:02:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,Referral,None,2026-06-29 14:41:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,Facebook,2026-07-31 19:43:00,2026-08-03 20:43:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,LinkedIn,2026-06-25 16:58:00,2026-06-28 22:58:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,Referral,None,2026-06-29 13:40:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,PPC,Facebook,2026-07-18 17:41:00,2026-07-18 23:41:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Education,MED,06 - Pending Application,PPC,None,2026-06-21 13:34:00,2026-06-21 14:34:00,2026-06-23 19:34:00,2026-06-25 23:34:00,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,03 - Contacted,SEO,None,2026-06-20 18:45:00,2026-06-23 19:45:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,Facebook,2026-07-17 08:00:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,01 - New,PPC,LinkedIn,2026-06-24 18:28:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,Google,2026-07-28 14:17:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Finance,MAF,01 - New,Referral,None,2026-06-26 14:54:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,01 - New,SEO,None,2026-07-30 14:43:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Finance,MAF,03 - Contacted,Referral,None,2026-07-12 10:37:00,2026-07-12 12:37:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Google,2026-07-18 12:53:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,01 - New,SEO,None,2026-07-26 19:16:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-07-08 18:13:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,None,2026-06-17 20:57:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,01 - New,PPC,Google,2026-07-16 16:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,SEO,None,2026-07-01 10:00:00,2026-07-03 14:00:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Management,MM,01 - New,PPC,LinkedIn,2026-07-02 12:30:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Management,MM,08 - File Complete,PPC,Facebook,2026-07-23 14:15:00,2026-07-26 21:15:00,2026-07-29 23:15:00,2026-07-30 00:15:00,2026-08-02 04:15:00,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,SEO,None,2026-07-09 07:53:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,PPC,LinkedIn,2026-07-12 11:01:00,2026-07-13 20:01:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,Facebook,2026-06-28 12:17:00,2026-06-29 15:17:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,PPC,None,2026-07-07 20:25:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Analytics,MBANAL,08 - File Complete,PPC,None,2026-07-06 08:20:00,2026-07-07 08:20:00,2026-07-10 08:20:00,2026-07-10 09:20:00,2026-07-13 15:20:00,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Finance,MAF,01 - New,PPC,None,2026-07-15 11:58:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Sunway University - Online,Master of Education,MED,03 - Contacted,SEO,None,2026-07-06 08:53:00,2026-07-07 13:53:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Josephine Jemes
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,LinkedIn,2026-07-05 08:43:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,PPC,Google,2026-06-20 11:48:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,SEO,None,2026-07-03 20:44:00,2026-07-04 01:44:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Marketing,MMKTG,01 - New,Creative,None,2026-06-20 08:13:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-07-05 19:06:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Education,MED,05 - Interview Completed,PPC,Google,2026-07-07 19:45:00,2026-07-09 05:45:00,2026-07-12 10:45:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,SEO,None,2026-07-16 14:02:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,08 - File Complete,PPC,None,2026-06-18 08:36:00,2026-06-20 13:36:00,2026-06-23 14:36:00,2026-06-23 14:36:00,2026-06-26 15:36:00,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,SEO,None,2026-08-02 12:37:00,2026-08-05 17:37:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Leela Devi
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,PPC,Google,2026-07-12 16:20:00,2026-07-14 02:20:00,2026-07-18 10:20:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Data Science,MDS,01 - New,Creative,None,2026-06-29 13:11:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,01 - New,PPC,Google,2026-06-25 07:53:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,PPC,Facebook,2026-07-07 11:37:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Nadia Ali Yasak
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,None,2026-07-18 18:32:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,SEO,None,2026-07-10 14:16:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,SEO,None,2026-08-01 09:02:00,2026-08-01 17:02:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,SEO,None,2026-06-17 16:22:00,2026-06-18 22:22:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,SEO,None,2026-06-29 15:29:00,2026-07-01 15:29:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,Creative,None,2026-07-13 08:15:00,2026-07-15 08:15:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,01 - New,PPC,Facebook,2026-07-05 20:32:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Education,MED,01 - New,PPC,Facebook,2026-06-15 10:09:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,PPC,None,2026-06-19 18:05:00,2026-06-22 02:05:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,LinkedIn,2026-07-19 14:32:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Finance,MAF,01 - New,SEO,None,2026-07-26 19:08:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Management,MM,03 - Contacted,Referral,None,2026-07-12 17:16:00,2026-07-15 03:16:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Management,MM,03 - Contacted,Traditional,None,2026-07-17 10:13:00,2026-07-17 20:13:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Facebook,2026-06-21 17:00:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Creative,None,2026-07-03 10:24:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Education,MED,01 - New,PPC,None,2026-07-27 13:36:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Facebook,2026-07-15 07:21:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Sunway University - Online,Master of Marketing,MMKTG,01 - New,SEO,None,2026-07-09 10:26:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,03 - Contacted,Referral,None,2026-06-16 17:02:00,2026-06-19 17:02:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,LinkedIn,2026-07-24 17:04:00,2026-07-27 17:04:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Sunway University - Online,Master of Business Analytics,MBANAL,03 - Contacted,SEO,None,2026-07-04 07:11:00,2026-07-04 11:11:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Singapore Institute of Management - Online,SIM x UNSW Master of Analytics,SIM x UNSW Master of Analytics,01 - New,PPC,LinkedIn,2026-06-15 15:05:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Singapore Institute of Management - Online,SIM x UNSW Master of Data Science,SIM x UNSW Master of Data Science,03 - Contacted,PPC,None,2026-07-03 10:28:00,2026-07-05 19:28:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,01 - New,PPC,Facebook,2026-07-02 19:30:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Noormiera Yusoff
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,SEO,None,2026-07-08 16:54:00,2026-07-08 18:54:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Beiley Chen
Sunway University - Online,Master of Business Administration,MBA,05 - Interview Completed,PPC,LinkedIn,2026-07-07 12:38:00,2026-07-07 17:38:00,2026-07-08 01:38:00,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Sunway University - Online,Master of Finance,MAF,03 - Contacted,PPC,None,2026-07-21 18:31:00,2026-07-23 21:31:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Marketing,MMKTG,03 - Contacted,PPC,Facebook,2026-08-02 17:17:00,2026-08-04 22:17:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,01 - New,PPC,LinkedIn,2026-06-26 10:22:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,03 - Contacted,PPC,None,2026-06-20 09:53:00,2026-06-21 16:53:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Leela Devi
Sunway University - Online,Master of Marketing,MMKTG,05 - Interview Completed,PPC,Google,2026-06-23 11:54:00,2026-06-25 18:54:00,2026-06-29 21:54:00,,,2026 T4 - 6/7/2026 - 21/8/2026,Josephine Jemes
Sunway University - Online,Master of Data Science,MDS,03 - Contacted,SEO,None,2026-06-25 16:07:00,2026-06-26 17:07:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Beiley Chen
Singapore Institute of Management - Online,Graduate Diploma in Data Science,GDDS,03 - Contacted,Creative,None,2026-07-29 07:17:00,2026-07-30 08:17:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Marketing,MMKTG,01 - New,PPC,Facebook,2026-06-18 08:01:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Peggie Tan
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,01 - New,PPC,None,2026-07-11 15:29:00,,,,,2026 T5 - 7/9/2026 - 23/10/2026,Miki Cheah
Sunway University - Online,Master of Business Administration,MBA,03 - Contacted,SEO,None,2026-07-24 17:10:00,2026-07-27 02:10:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Ron Lim
Singapore Institute of Management - Online,Graduate Certificate in Analytics,GCA,08 - File Complete,SEO,None,2026-07-22 09:02:00,2026-07-23 16:02:00,2026-07-23 22:02:00,2026-07-26 23:02:00,2026-07-29 03:02:00,2026 T4 - 6/7/2026 - 21/8/2026,Miki Cheah
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,Referral,None,2026-07-25 16:30:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Ron Lim
Sunway University - Online,Master of Business Analytics,MBANAL,01 - New,PPC,Facebook,2026-06-27 16:58:00,,,,,2026 T4 - 6/7/2026 - 21/8/2026,Nadia Ali Yasak
Singapore Institute of Management - Online,Graduate Certificate in Human Resource Management,GCHRM,03 - Contacted,PPC,LinkedIn,2026-06-28 13:28:00,2026-06-28 17:28:00,,,,2026 T4 - 6/7/2026 - 21/8/2026,Noormiera Yusoff
Sunway University - Online,Master of Education,MED,03 - Contacted,PPC,Facebook,2026-07-02 10:23:00,2026-07-02 10:23:00,,,,2026 T5 - 7/9/2026 - 23/10/2026,Peggie Tan
`;
