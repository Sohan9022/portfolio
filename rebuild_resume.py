import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
import os

doc = docx.Document()

# Set tight margins for strictly 1-page fit
for section in doc.sections:
    section.top_margin = Inches(0.32)
    section.bottom_margin = Inches(0.32)
    section.left_margin = Inches(0.42)
    section.right_margin = Inches(0.42)

def add_p(text='', space_before=0, space_after=1.5, line_spacing=1.03):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = line_spacing
    return p

def add_heading(title):
    p = add_p(space_before=5, space_after=1.5)
    run = p.add_run(title)
    run.font.name = 'Calibri'
    run.font.size = Pt(10)
    run.font.bold = True
    run.font.color.rgb = RGBColor(18, 18, 20)
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="1" w:color="D5D5CE"/></w:pBdr>')
    pPr.append(pBdr)
    return p

# 1. HEADER
p_name = add_p(space_before=0, space_after=0.5)
p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_name = p_name.add_run('SOHAN GADEWAR')
r_name.font.name = 'Calibri'
r_name.font.size = Pt(15.5)
r_name.font.bold = True
r_name.font.color.rgb = RGBColor(18, 18, 20)

p_sub = add_p(space_before=0, space_after=1)
p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_sub = p_sub.add_run('Associate Product Manager Intern Candidate  |  B.Tech IT, VIIT Pune (CGPA: 8.97 / 10.0)')
r_sub.font.name = 'Calibri'
r_sub.font.size = Pt(9)
r_sub.font.bold = True
r_sub.font.color.rgb = RGBColor(40, 40, 45)

p_contact = add_p(space_before=0, space_after=2)
p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_con = p_contact.add_run('+91 9022778561  •  sohangadewar9022@gmail.com  •  Portfolio: portfolio-sohan9022.vercel.app  •  LinkedIn  •  GitHub  •  Pune, India')
r_con.font.name = 'Calibri'
r_con.font.size = Pt(8.5)
r_con.font.color.rgb = RGBColor(90, 90, 95)

# 2. EDUCATION
add_heading('EDUCATION')
p_edu1 = add_p(space_before=1, space_after=0.5)
r1 = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
r1.font.name = 'Calibri'
r1.font.size = Pt(9)
r1.font.bold = True
r2 = p_edu1.add_run('  |  Bachelor of Technology in Information Technology')
r2.font.name = 'Calibri'
r2.font.size = Pt(9)
r3 = p_edu1.add_run('  |  2023 – 2027  |  CGPA: 8.97 / 10.0')
r3.font.name = 'Calibri'
r3.font.size = Pt(9)
r3.font.bold = True

p_edu2 = add_p(space_before=0, space_after=2)
r_crs = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, System Design  •  Problem Solving: 400+ LeetCode, 210+ GeeksforGeeks')
r_crs.font.name = 'Calibri'
r_crs.font.size = Pt(8.5)
r_crs.font.color.rgb = RGBColor(60, 60, 65)

# 3. PRODUCT PROJECTS & PRDS
add_heading('PRODUCT PROJECTS & PRD SPECIFICATIONS')

# Project 1: SHRH
p_pr1 = add_p(space_before=2, space_after=0.5)
r = p_pr1.add_run('SHRH — Semantic Human-Readable Hashing  |  AI Governance & DevTools  |  Google APM PRD Specification')
r.font.name = 'Calibri'
r.font.size = Pt(9)
r.font.bold = True

p_pr1_b1 = add_p(space_before=0, space_after=0.5)
r = p_pr1_b1.add_run('• Problem: Enterprise AI teams managing 50–500 production prompts in git suffer alert fatigue: SHA-256 hashes treat harmless typos and critical security regressions (\'MUST enforce MFA\' → \'MAY enforce MFA\') as identical alarms.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pr1_b2 = add_p(space_before=0, space_after=0.5)
r = p_pr1_b2.add_run('• Product Decision: Identified that topical drift and deontic constraint shifts are orthogonal risk signals. Architected a local Dual-Channel Gate over cloud LLMs, eliminating $15k/mo cost, latency, and data egress while triaging PRs into Auto-Approve, Review, or Quarantine.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pr1_b3 = add_p(space_before=0, space_after=2)
r = p_pr1_b3.add_run('• Validation & PRD: Benchmarked on 2,744 revision pairs: slashed defect escapes by 92.6% with 0.0% false alarms; 70.0% routine PRs auto-merge. Authored comprehensive Google APM PRD defining JTBD, Maya Lin ICP, and Autonomous Safe Triage Rate (ASTR).')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# Project 2: Project Sentinel
p_pr2 = add_p(space_before=2, space_after=0.5)
r = p_pr2.add_run('Project Sentinel — AI Project Memory & Decision Agent  |  Enterprise AI  |  Live MVP: echo-sentinel-08.lovable.app')
r.font.name = 'Calibri'
r.font.size = Pt(9)
r.font.bold = True

p_pr2_b1 = add_p(space_before=0, space_after=0.5)
r = p_pr2_b1.add_run('• Problem: Engineering decisions made across standups, Slack, and Jira are quickly lost. Chatty AI bots aggravate notification fatigue by posting unprompted summaries that interrupt deep work and erode developer trust.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pr2_b2 = add_p(space_before=0, space_after=0.5)
r = p_pr2_b2.add_run('• Product Decision: Prioritized user attention over bot visibility. Enforced a \'Silent by Default\' model that ingests transcripts and commit streams passively, surfacing drift between spoken intent and database logs only when explicitly queried.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pr2_b3 = add_p(space_before=0, space_after=2)
r = p_pr2_b3.add_run('• Outcome: Shipped interactive 8-step live Lovable MVP featuring immutable decision stores, state-drift detection, and audit queries. Authored complete Notion PRD with PostgreSQL event schemas, state machines, and user stories.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# Project 3: AI Asana Analyst
p_pr3 = add_p(space_before=2, space_after=0.5)
r = p_pr3.add_run('AI Asana Analyst — Edge Computer Vision vs. Asynchronous GenAI  |  AI Systems & HCI  |  Full PRD v2.0')
r.font.name = 'Calibri'
r.font.size = Pt(9)
r.font.bold = True

p_pr3_b1 = add_p(space_before=0, space_after=0.5)
r = p_pr3_b1.add_run('• Problem & Latency Budget: Real-time yoga posture evaluation requires 25 FPS (40ms budget). Cloud multimodal vision LLMs introduce 800ms–2s latency and high API costs, while visual-only feedback overwhelms practitioners holding balance poses.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pr3_b2 = add_p(space_before=0, space_after=2)
r = p_pr3_b2.add_run('• PRD & Architecture: Architected a decoupled pipeline: MediaPipe BlazePose (33 landmarks) + NumPy geometric engine evaluate angles on edge CPU (<40ms) with offline audio alerts (pyttsx3, 3s cooldown). Delegated conversational coaching paragraphs to non-blocking asynchronous GenAI in post-session PDF reports with silent fallback to rule-based strings.')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# 4. PATENTS & RESEARCH
add_heading('PATENTS & USER RESEARCH')

p_pat1 = add_p(space_before=1, space_after=0.5)
r = p_pat1.add_run('• Patent Application Draft (VIT Pune UX Lab): AI-Driven Multilingual Adaptive UI Framework & Zero-Risk Financial Sandbox — Designed a dual-mode environment controller pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture inspection to eliminate operational anxiety in emerging markets | 2026')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_pat2 = add_p(space_before=0, space_after=2)
r = p_pat2.add_run('• Patent Filed (South African Patent Office): AI-Powered Lost & Found Matching System — Conceptualized a privacy-first blind matching architecture using a 5-factor multimodal scoring model (image, text, geo, timestamp) with automated urgency detection | 2025')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# 5. HONORS & COMPETITIONS
add_heading('AWARDS & COMPETITIVE ACHIEVEMENTS')
p_aw1 = add_p(space_before=1, space_after=0.5)
r = p_aw1.add_run('• India Innovates Hackathon — Finalist: Selected among top ~1,000 finalist teams nationwide out of ~6,000+ participating teams (Top ~16%)')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_aw2 = add_p(space_before=0, space_after=2)
r = p_aw2.add_run('• GHCI 25 Hackathon — Round 2 Qualifier: AnitaB.org India & Backbase | National GenAI Hackathon: \'Unbound with GenAI: Breaking Barriers, Creating Impact\'')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# 6. PRODUCT & TECHNICAL SKILLS
add_heading('PRODUCT & TECHNICAL SKILLS')
p_sk1 = add_p(space_before=1, space_after=0.5)
r = p_sk1.add_run('• Product Management: Product Discovery, PRD Writing, Jobs-to-be-Done (JTBD), User Journey Mapping, Prioritization, North Star & Counter-Metrics, Experimentation Design, GTM Strategy, Trade-off Analysis')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_sk2 = add_p(space_before=0, space_after=0.5)
r = p_sk2.add_run('• AI & Systems: LLM Prompt Engineering, RAG Architectures, Multimodal Extraction, Computer Vision (MediaPipe), AI Governance, Lovable.dev (Rapid MVPs), Supabase, PostgreSQL (RPCs, Row-Level Security)')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

p_sk3 = add_p(space_before=0, space_after=2)
r = p_sk3.add_run('• Engineering & Problem Solving: Java, Spring Framework, Python, Go, REST APIs, Docker, Git  •  Competitive Programming: 400+ LeetCode, 210+ GeeksforGeeks')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

# 7. CERTIFICATIONS
add_heading('CERTIFICATIONS')
p_cert = add_p(space_before=1, space_after=0)
r = p_cert.add_run('Product Management Masterclass (GeeksforGeeks)  •  AI Agents & Automation (CampusX)  •  Advanced RAG Architecture (CampusX)  •  Prompt Engineering & Docker for ML (CampusX)  •  Postman API Student Expert')
r.font.name = 'Calibri'
r.font.size = Pt(8.5)

out1 = 'e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.docx'
out2 = 'e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.docx'
doc.save(out1)
doc.save(out2)
print(f'Successfully generated: {out1} ({os.path.getsize(out1)} bytes)')
print(f'Successfully generated: {out2} ({os.path.getsize(out2)} bytes)')
