import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
import os
import win32com.client
import pypdf

def build_top_tier_resume():
    doc = docx.Document()
    
    # Precise margins for strictly 1-page fit
    for section in doc.sections:
        section.top_margin = Inches(0.28)
        section.bottom_margin = Inches(0.28)
        section.left_margin = Inches(0.38)
        section.right_margin = Inches(0.38)
        
    def add_p(space_before=0, space_after=1.2, line_spacing=1.02):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_heading(title):
        p = add_p(space_before=4, space_after=1.5)
        run = p.add_run(title)
        run.font.name = 'Calibri'
        run.font.size = Pt(9.5)
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
    r_name.font.size = Pt(15)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(18, 18, 20)

    p_sub = add_p(space_before=0, space_after=1)
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run('Associate Product Manager Candidate  |  B.Tech IT, VIIT Pune (CGPA: 8.97 / 10.0)')
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(9)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(40, 40, 45)

    p_contact = add_p(space_before=0, space_after=2)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_con = p_contact.add_run('+91 9022778561  •  sohangadewar9022@gmail.com  •  Portfolio: portfolio-sohan9022.vercel.app  •  LinkedIn  •  GitHub  •  Pune, India')
    r_con.font.name = 'Calibri'
    r_con.font.size = Pt(8.5)
    r_con.font.color.rgb = RGBColor(80, 80, 85)

    # 2. EDUCATION
    add_heading('EDUCATION')
    p_edu1 = add_p(space_before=1, space_after=0.5)
    r = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True
    r = p_edu1.add_run('  |  Bachelor of Technology in Information Technology')
    r.font.name = 'Calibri'; r.font.size = Pt(9)
    r = p_edu1.add_run('  |  2023 – 2027  |  CGPA: 8.97 / 10.0')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p_edu2 = add_p(space_before=0, space_after=2)
    r = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, System Design  •  Problem Solving: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5); r.font.color.rgb = RGBColor(60, 60, 65)

    # 3. SELECTED PRODUCT SYSTEMS & LIVE PROTOTYPES (ONLY LIVE WORK FROM PORTFOLIO)
    add_heading('SELECTED PRODUCT SYSTEMS & VALIDATED PROTOTYPES')

    # Project 1: Project Sentinel
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('Project Sentinel — AI Decision Memory & State-Drift Agent  |  Enterprise AI  |  Live MVP: echo-sentinel-08.lovable.app  |  Notion PRD')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Customer Discovery: Spoken engineering agreements in daily standups frequently diverge from verified code state. Existing Slack summary bots aggravated notification fatigue by posting unsolicited paragraph summaries that interrupted deep work and eroded developer trust.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Product Strategy & Scoping: Instituted a strict "Silent-by-Default" thesis—passively inaudits spoken commitments and Git commit streams without ever messaging channels unprompted; defined explicit non-goals in V1 (no automated ticket spam, no velocity surveillance).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Execution & Outcome: Shipped interactive 8-step clickable MVP on Lovable with append-only PostgreSQL event schema comparing spoken intent vs. verified commit SHAs; authored complete Notion PRD with state-drift detection machines and audit queries.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 2: FinMate AI
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('FinMate AI — Conversational Expense Memory & Deterministic Accounting  |  FinTech Systems  |  Live MVP: tell-finmate-ai.lovable.app  |  Notion PRD')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Behavioral Insight: 6-field manual form logging causes steep drop-off in personal finance, but pure conversational LLMs hallucinate calculations, making them untrustworthy for real financial records.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Product Architecture: Decoupled unstructured ingestion from arithmetic—restricted multimodal LLMs (voice notes, receipt OCR, natural chat) strictly to entity extraction, while delegating 100% of calculations to concurrency-safe PostgreSQL stored procedures.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Execution & Outcome: Shipped live Lovable prototype with voice capture, informal debt reconciliation, and evidence-backed totals citing underlying transaction rows with zero math hallucinations; authored complete Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 3: Spaces
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('Spaces — Contextual Personalization Framework & Telemetry Firewall  |  AI Personalization  |  Live MVP: space-context-switch.lovable.app  |  Notion PRD')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Insight: Single-persona recommendation feeds suffer from "context collapse"—casual weekend browsing pollutes weekday professional feeds, forcing users to juggle friction-heavy burner accounts.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Architecture & Outcome: Architected a "Context Firewall" middleware isolating behavioral telemetry and vector embedding stores per active space while keeping authentication, identity, and billing consolidated under 1 account; shipped live Lovable MVP with 4 isolated spaces; authored Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 4: SHRH
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('SHRH — Semantic Human-Readable Hashing  |  AI Governance & Developer Tools  |  Google APM PRD Specification')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• Problem & Metric Design: Standard SHA-256 hashes treat harmless formatting typo edits identically to critical security regressions (\'MUST enforce MFA\' → \'MAY enforce MFA\'), causing alert fatigue for enterprise prompt engineering teams.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Trade-off & PRD Spec: Decoupled topical semantic drift from deontic constraint shifts via local dual-channel triage, saving $15k/mo in cloud LLM costs and data egress. Benchmarked on 2,744 revisions (slashed defect escapes by 92.6% with 0.0% false alarms on benign edits); authored full Google APM PRD spec (Maya Lin ICP, risk matrix, GTM).')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Project 5: GiftVerse Moments
    p = add_p(space_before=1.5, space_after=0.5)
    r = p.add_run('GiftVerse Moments — Digital Gifting Reveal Experiences  |  Consumer AI  |  Live MVP: gift-verse-moments.lovable.app  |  Notion PRD')
    r.font.name = 'Calibri'; r.font.size = Pt(9); r.font.bold = True

    p = add_p(space_before=0, space_after=1.5)
    r = p.add_run('• Product Discovery & MVP: Identified that digital gift cards are sterile to receive. Built an AI Experience Director choreographing 30–60s micro-suspense reveal journeys with encrypted payload isolation; shipped live Lovable MVP; authored Notion PRD.')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 4. PATENTS & HUMAN-CENTERED RESEARCH
    add_heading('PATENTS & USER RESEARCH')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• Patent Application Draft (VIT Pune UX Lab): AI-Driven Multilingual Adaptive UI Framework & Zero-Risk Financial Sandbox — Designed dual-mode environment pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture affordances to eliminate digital financial hesitation in emerging vernacular markets | 2026')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• Patent Filed (South African Patent Office): AI-Powered Lost & Found Matching System — Conceptualized a 5-factor blind multimodal scoring architecture (image embeddings, NLP text, geolocation, timestamp) with automated urgency detection | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 5. HONORS & ACHIEVEMENTS
    add_heading('HONORS & COMPETITIONS')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• India Innovates Hackathon — National Finalist: Selected in top ~1,000 teams nationwide out of 6,000+ participating teams (Top ~16%)')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• GHCI 25 Hackathon — Round 2 Qualifier: AnitaB.org India & Backbase | National GenAI Hackathon: \'Unbound with GenAI: Breaking Barriers, Creating Impact\'')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 6. PRODUCT & TECHNICAL SKILLS
    add_heading('PRODUCT MANAGEMENT & TECHNICAL SKILLS')
    p = add_p(space_before=1, space_after=0.5)
    r = p.add_run('• Product Management: Product Discovery, PRD Writing, Jobs-to-be-Done (JTBD), User Journey Mapping, RICE Prioritization, North Star & Counter-Metrics, Customer Interviews, Experimentation, GTM Strategy, Trade-off Analysis')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=0.5)
    r = p.add_run('• AI & Systems: LLM Prompt Engineering, RAG Architectures, Multimodal Ingestion, Deterministic SQL, AI Governance, Lovable.dev (Rapid MVPs), Supabase (RLS), Vector Embeddings')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    p = add_p(space_before=0, space_after=2)
    r = p.add_run('• Engineering & Problem Solving: Java, Spring Framework, Python, SQL/PostgreSQL, REST APIs, Git, System Architecture  •  Competitive Programming: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # 7. CERTIFICATIONS
    add_heading('CERTIFICATIONS')
    p = add_p(space_before=1, space_after=0)
    r = p.add_run('Product Management Masterclass (GeeksforGeeks)  •  AI Agents & Automation (CampusX)  •  Advanced RAG Architecture (CampusX)  •  Prompt Engineering & Docker for ML (CampusX)  •  Postman API Student Expert')
    r.font.name = 'Calibri'; r.font.size = Pt(8.5)

    # Target destinations
    dest_docx_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.docx')
    dest_docx_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.docx')
    dest_docx_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.docx')

    dest_pdf_1 = os.path.abspath('e:/pm_portfoli_new/Sohan_Gadewar_Google_APM_Resume.pdf')
    dest_pdf_2 = os.path.abspath('e:/pm_portfoli_new/public/Sohan_Gadewar_Resume.pdf')
    dest_pdf_3 = os.path.abspath('e:/pm_portfoli_new/dist/Sohan_Gadewar_Resume.pdf')

    # Save docx files
    doc.save(dest_docx_1)
    doc.save(dest_docx_2)
    if os.path.exists(os.path.dirname(dest_docx_3)):
        doc.save(dest_docx_3)

    # Convert to PDF via Word COM
    word = win32com.client.Dispatch('Word.Application')
    word.Visible = False
    wdoc = word.Documents.Open(dest_docx_1)
    pages = wdoc.ComputeStatistics(2)
    wdoc.SaveAs2(dest_pdf_1, 17)
    wdoc.SaveAs2(dest_pdf_2, 17)
    if os.path.exists(os.path.dirname(dest_pdf_3)):
        wdoc.SaveAs2(dest_pdf_3, 17)
    wdoc.Close(False)
    word.Quit()

    # Validate with PyPDF
    reader = pypdf.PdfReader(dest_pdf_1)
    pdf_pages = len(reader.pages)

    print(f"Build complete!")
    print(f"Word computed pages: {pages}")
    print(f"PyPDF verified pages: {pdf_pages}")
    print(f"Docx generated: {dest_docx_1} ({os.path.getsize(dest_docx_1)} bytes)")
    print(f"Docx public: {dest_docx_2} ({os.path.getsize(dest_docx_2)} bytes)")
    print(f"PDF generated: {dest_pdf_1} ({os.path.getsize(dest_pdf_1)} bytes)")
    print(f"PDF public: {dest_pdf_2} ({os.path.getsize(dest_pdf_2)} bytes)")

if __name__ == '__main__':
    build_top_tier_resume()
