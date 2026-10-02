import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import parse_xml
import os
import win32com.client
import pypdf

def build_top_tier_resume():
    doc = docx.Document()
    
    # Elegant margins for comfortable 1-page layout with depth
    for section in doc.sections:
        section.top_margin = Inches(0.38)
        section.bottom_margin = Inches(0.38)
        section.left_margin = Inches(0.45)
        section.right_margin = Inches(0.45)
        
    def add_p(space_before=0, space_after=1.8, line_spacing=1.06):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(space_before)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = line_spacing
        return p

    def add_heading(title):
        p = add_p(space_before=5, space_after=2)
        run = p.add_run(title)
        run.font.name = 'Calibri'
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = RGBColor(18, 18, 20)
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:bottom w:val="single" w:sz="6" w:space="1" w:color="D5D5CE"/></w:pBdr>')
        pPr.append(pBdr)
        return p

    def add_hyperlink(paragraph, url, text, color_hex="1D4ED8", underline=True, font_size_pt=9.0, bold=False):
        part = paragraph.part
        r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
        u_tag = '<w:u w:val="single"/>' if underline else ''
        b_tag = '<w:b/>' if bold else ''
        sz_val = int(font_size_pt * 2)
        xml_str = f'''<w:hyperlink xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="{r_id}">
            <w:r>
                <w:rPr>
                    <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/>
                    <w:sz w:val="{sz_val}"/>
                    <w:color w:val="{color_hex}"/>
                    {u_tag}
                    {b_tag}
                </w:rPr>
                <w:t xml:space="preserve">{text}</w:t>
            </w:r>
        </w:hyperlink>'''
        paragraph._p.append(parse_xml(xml_str))

    # 1. HEADER
    p_name = add_p(space_before=0, space_after=1)
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_name = p_name.add_run('SOHAN GADEWAR')
    r_name.font.name = 'Calibri'
    r_name.font.size = Pt(16)
    r_name.font.bold = True
    r_name.font.color.rgb = RGBColor(18, 18, 20)

    p_sub = add_p(space_before=0, space_after=1.5)
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_sub = p_sub.add_run('Associate Product Manager Candidate  |  B.Tech IT, VIIT Pune (CGPA: 8.97 / 10.0)')
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(9.5)
    r_sub.font.bold = True
    r_sub.font.color.rgb = RGBColor(30, 30, 35)

    p_contact = add_p(space_before=0, space_after=3)
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_contact.add_run('+91 9022778561  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'mailto:sohangadewar9022@gmail.com', 'sohangadewar9022@gmail.com', underline=False, font_size_pt=9.0)
    r = p_contact.add_run('  •  Portfolio: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://portfolio-sohan9022.vercel.app', 'portfolio-sohan9022.vercel.app', underline=True, font_size_pt=9.0)
    r = p_contact.add_run('  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://linkedin.com', 'LinkedIn', underline=True, font_size_pt=9.0)
    r = p_contact.add_run('  •  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(80, 80, 85)
    add_hyperlink(p_contact, 'https://github.com/Sohan9022', 'GitHub', underline=True, font_size_pt=9.0)
    r = p_contact.add_run('  •  Pune, India')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(80, 80, 85)

    # 2. EDUCATION
    add_heading('EDUCATION')
    p_edu1 = add_p(space_before=1, space_after=0.5)
    r = p_edu1.add_run('Vishwakarma Institute of Information Technology (VIIT), Pune')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True
    r = p_edu1.add_run('  |  Bachelor of Technology in Information Technology')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5)
    r = p_edu1.add_run('  |  2023 – 2027  |  CGPA: 8.97 / 10.0')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True

    p_edu2 = add_p(space_before=0, space_after=3)
    r = p_edu2.add_run('Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, System Design  •  Problem Solving: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.color.rgb = RGBColor(60, 60, 65)

    # 3. SELECTED PRODUCT SYSTEMS (ONLY THE 2 TOP FLAGSHIP SYSTEMS)
    add_heading('SELECTED PRODUCT SYSTEMS & VALIDATED PROTOTYPES')

    # Flagship 1: Project Sentinel
    p = add_p(space_before=2, space_after=0.8)
    r = p.add_run('Project Sentinel — AI Decision Memory & State-Drift Agent  |  Enterprise AI  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True
    add_hyperlink(p, 'https://echo-sentinel-08.lovable.app', 'echo-sentinel-08.lovable.app', font_size_pt=9.5, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/PROJECT-SENTINEL-3d053f22e2b0800d891bd24a7f914c07?source=copy_link', 'Notion PRD', font_size_pt=9.5, bold=True)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• Discovery & Problem Framing: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Identified critical engineering context loss across daily standups, Slack threads, and Jira; observed that incumbent meeting summarizers trigger high uninstall rates by blasting unsolicited channel notifications that disrupt deep work.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• Product Strategy & "Silent-by-Default" Thesis: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Formulated the "Silent-by-Default" product thesis—ingests audio transcripts and Git commit streams passively without interrupting channels; scoped out automated ticket creation and developer velocity surveillance in V1 to protect team psychological safety.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• State-Drift Detection & Architecture: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Architected deterministic audit engine surfacing discrepancies between spoken commitments and recorded codebase state (the "said-vs-confirmed" gap) strictly upon explicit user query; designed append-only PostgreSQL event schema mapping detected drift to immutable transcript timestamps.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=2.5)
    r = p.add_run('• Execution & Shipped Validation: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Shipped interactive 8-step clickable MVP on Lovable with live state drift queries; authored comprehensive 400-line Notion PRD detailing state transition matrices, query grammar, failure recovery states, and phased enterprise GTM rollout.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    # Flagship 2: FinMate AI
    p = add_p(space_before=2, space_after=0.8)
    r = p.add_run('FinMate AI — Conversational Expense Memory & Deterministic Accounting  |  FinTech Systems  |  Live MVP: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True
    add_hyperlink(p, 'https://tell-finmate-ai.lovable.app', 'tell-finmate-ai.lovable.app', font_size_pt=9.5, bold=True)
    r = p.add_run('  |  ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.5); r.font.bold = True
    add_hyperlink(p, 'https://app.notion.com/p/FINMATE-AI-3d053f22e2b080479a82e50becf237f2?source=copy_link', 'Notion PRD', font_size_pt=9.5, bold=True)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• User Friction & Market Insight: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Addressed the steep user abandonment rate in personal finance tracking caused by tedious 6-field manual entry forms, while uncovering that pure conversational LLM finance bots routinely hallucinate arithmetic totals, rendering them untrustworthy for real financial accounting.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• Decoupled System Architecture: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Established two-stage decoupled architecture: constrained multimodal LLMs (voice notes, receipt snapshots via OCR, natural language chat) strictly to intent and entity parsing (JSON), while routing 100% of arithmetic calculations and balance aggregations to concurrency-safe PostgreSQL stored procedures (RPCs).')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• Auditability & Zero-Hallucination Evidence: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Enforced complete financial transparency through evidence-linked ledger rows—guaranteeing that every AI response provides clickable citations directly to underlying transaction records, eliminating calculation discrepancies entirely.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=3)
    r = p.add_run('• Execution & Shipped Validation: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Shipped production-ready Lovable MVP featuring streaming voice transcription, receipt parsing, and informal loan tracking; authored complete Notion PRD covering database schemas, RLS security policies, and error handling states.')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    # 4. RESEARCH & INTELLECTUAL PROPERTY
    add_heading('RESEARCH & INTELLECTUAL PROPERTY')
    p = add_p(space_before=1.5, space_after=0.8)
    r = p.add_run('• Empirical HCI Research Study: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('AI-Driven Multilingual Adaptive UI Framework & Zero-Risk Financial Sandbox — Designed dual-mode environment pairing live transactions with a simulated practice sandbox (dummy balances), in-situ Hold-to-Translate, and Circle-to-Understand gesture affordances to eliminate digital financial hesitation in emerging vernacular markets | 2026')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=3)
    r = p.add_run('• Patent Filed (South African Patent Office): ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('AI-Powered Lost & Found Matching System — Conceptualized a 5-factor blind multimodal scoring architecture (image embeddings, NLP text, geolocation, timestamp) with automated urgency detection | 2025')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    # 5. HONORS & ACHIEVEMENTS
    add_heading('HONORS & COMPETITIONS')
    p = add_p(space_before=1.5, space_after=0.8)
    r = p.add_run('• India Innovates Hackathon — National Finalist: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Selected among top finalist teams nationwide out of 6,000+ participating teams')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=3)
    r = p.add_run('• GHCI 25 Hackathon — Round 2 Qualifier: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('AnitaB.org India & Backbase | National GenAI Hackathon: \'Unbound with GenAI: Breaking Barriers, Creating Impact\'')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    # 6. PRODUCT & TECHNICAL SKILLS
    add_heading('PRODUCT MANAGEMENT & TECHNICAL SKILLS')
    p = add_p(space_before=1.5, space_after=0.8)
    r = p.add_run('• Product Management: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Product Discovery, PRD Writing, Jobs-to-be-Done (JTBD), User Journey Mapping, RICE Prioritization, North Star & Guardrail Metrics, Customer Interviews, Experimentation, GTM Strategy, Trade-off Analysis')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=0.8)
    r = p.add_run('• AI & Systems: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('LLM Prompt Engineering, RAG Architectures, Multimodal Ingestion, Deterministic SQL, AI Governance, Lovable.dev (Rapid MVPs), Supabase (RLS), Vector Embeddings')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    p = add_p(space_before=0, space_after=3)
    r = p.add_run('• Engineering & Problem Solving: ')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0); r.font.bold = True
    r = p.add_run('Java, Spring Framework, Python, SQL/PostgreSQL, REST APIs, Git, System Architecture  •  Competitive Programming: 400+ LeetCode, 210+ GeeksforGeeks')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

    # 7. CERTIFICATIONS
    add_heading('CERTIFICATIONS')
    p = add_p(space_before=1.5, space_after=0)
    r = p.add_run('Product Management Masterclass (GeeksforGeeks)  •  AI Agents & Automation (CampusX)  •  Advanced RAG Architecture (CampusX)  •  Prompt Engineering & Docker for ML (CampusX)  •  Postman API Student Expert')
    r.font.name = 'Calibri'; r.font.size = Pt(9.0)

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
