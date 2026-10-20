// Component gallery: every Figma variant and state, laid out like the Figma pages for side-by-side review.
import { useState, type ReactNode } from 'react';
import {
  Alert,
  Avatar,
  AvatarUpload,
  Badge,
  Button,
  Checkbox,
  CodeField,
  ConfirmationPopup,
  Icon,
  Input,
  NumericField,
  Pagination,
  PaginationItem,
  RadioButton,
  Search,
  TabItem,
  Tabs,
  Textarea,
  Toggle,
  Tooltip,
  UploadField,
  VerificationCodeInput,
  type ButtonIconPosition,
  type ButtonSize,
  type ButtonState,
  type ButtonVariant,
  type FeedbackVariant,
  type IconName,
  type InputState,
} from '../components';
import { icons } from '../icons/icons';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-6 rounded-2xl bg-primary p-8 inset-ring inset-ring-(--border-color-default)">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-xs font-medium tracking-wide text-muted uppercase">{label}</p>}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

const variants: ButtonVariant[] = ['filled', 'pill', 'outline', 'link'];
const sizes: ButtonSize[] = ['xl', 'lg', 'base', 'sm', 'xs'];
const states: ButtonState[] = ['default', 'hover', 'focus', 'disabled'];
const iconPositions: ButtonIconPosition[] = ['none', 'left', 'right', 'only'];
const feedback: FeedbackVariant[] = ['info', 'warning', 'danger', 'success'];
const inputStates: InputState[] = ['default', 'disabled', 'hover', 'focus', 'filled', 'error'];

const groups: Record<string, IconName[]> = {
  Actions: ['add', 'chevron-left', 'chevron-right', 'edit', 'upload', 'download', 'log-out', 'log-in', 'eye', 'eye-closed', 'delete', 'share', 'language', 'close'],
  Arrows: ['arrow-left', 'arrow-right', 'arrow-down', 'arrow-up', 'arrow-down-left', 'arrow-down-right', 'arrow-up-left', 'arrow-up-right'],
  Communication: ['phone', 'bell', 'mail'],
  'Status & Feedback': ['check-circle', 'close-circle', 'question-circle', 'danger', 'info-circle', 'cancel', 'exclamation'],
  'Input Fields': ['clock', 'calendar', 'search', 'file'],
  Users: ['user', 'users'],
};

export function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState(2);
  const [tab, setTab] = useState('overview');
  const [pillTab, setPillTab] = useState('overview');
  const tabList = ['Overview', 'Analytics', 'Reports', 'Notifications', 'Settings'].map(label => ({ id: label.toLowerCase(), label }));

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-primary py-4 px-8 shadow-xs">
        <div>
          <h1 className="text-xl font-semibold text-primary">Trianglz Web Design System</h1>
          <p className="text-sm text-secondary">React components built from the Figma file, using only design tokens.</p>
        </div>
        <Toggle label={dark ? 'Dark' : 'Light'} checked={dark} onCheckedChange={toggleTheme} />
      </header>

      <main className="mx-auto flex max-w-[80rem] flex-col gap-8 p-8">
        <Section id="buttons" title="Buttons">
          <Row label="variant × state (size base)">
            <div className="grid grid-cols-4 gap-4">
              {variants.flatMap(v => states.map(s => <Button key={v + s} variant={v} state={s}>Button text</Button>))}
            </div>
          </Row>
          <Row label="size">
            {sizes.map(s => <Button key={s} size={s}>Button text</Button>)}
          </Row>
          <Row label="iconPosition">
            {iconPositions.map(p => <Button key={p} iconPosition={p}>Button text</Button>)}
          </Row>
          <Row label="color (filled) — tokens only, not a Figma variant">
            {(['primary', 'info', 'success', 'warning', 'danger'] as const).map(c => <Button key={c} color={c}>{c}</Button>)}
          </Row>
        </Section>

        <Section id="inputs" title="Input Fields">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6">
              {inputStates.map(s => (
                <Input key={s} state={s} label="Label" optional helpText="More about this field" hint="This is a hint text." errorMessage={s === 'error' ? 'Error message' : undefined} icon="chevron-down" placeholder="Enter Name" defaultValue={s === 'filled' ? 'Lorem Ipsum' : undefined} disabled={s === 'disabled'} />
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {inputStates.map(s => (
                <Input key={s} state={s} label="Label" optional helpText="More about this field" hint="This is a hint text." errorMessage={s === 'error' ? 'Error message' : undefined} prefix="http://" placeholder="www.example.com" defaultValue={s === 'filled' ? 'www.example.com' : undefined} disabled={s === 'disabled'} />
              ))}
            </div>
            <div className="flex flex-col gap-6">
              {inputStates.map(s => (
                <Input key={s} state={s} label="Label" optional helpText="More about this field" hint="This is a hint text." errorMessage={s === 'error' ? 'Error message' : undefined} paymentIcon placeholder="0000 0000 0000 0000" defaultValue={s === 'filled' ? '0000 0000 0000 0000' : undefined} disabled={s === 'disabled'} />
              ))}
            </div>
          </div>
          <Row label="Textarea">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
              {inputStates.map(s => (
                <Textarea key={s} state={s} label="Description" optional helpText="More about this field" hint="This is a hint text." placeholder="Enter description" errorMessage={s === 'error' ? 'This field is required.' : undefined} defaultValue={s === 'filled' ? 'Text' : undefined} disabled={s === 'disabled'} />
              ))}
            </div>
          </Row>
          <Row label="Search">
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Search state="default" />
              <Search state="hover" />
              <Search state="filled" defaultValue="Lorem Ipsum" />
              <Search state="focus" />
            </div>
          </Row>
          <Row label="Upload Field">
            <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
              <UploadField label="Upload File" optional helpText="Help" hint="Accepted Formats: PDF, Word, Excel. Max File Size: 5MB" />
              <UploadField label="Upload File" optional helpText="Help" hint="Accepted Formats: PDF, Word, Excel. Max File Size: 5MB" disabled />
              <UploadField label="Upload File" optional helpText="Help" hint="Accepted Formats: PDF, Word, Excel. Max File Size: 5MB" state="hover" />
              <UploadField label="Upload File" optional helpText="Help" hint="Accepted Formats: PDF, Word, Excel. Max File Size: 5MB" fileName="File-Name.pdf" />
              <UploadField label="Upload File" optional helpText="Help" hint="Accepted Formats: PDF, Word, Excel. Max File Size: 5MB" errorMessage="Error message" />
            </div>
          </Row>
          <Row label="Code Field (state)">
            {(['default', 'hover', 'focus', 'filled', 'error', 'success', 'disabled'] as const).map(s => (
              <CodeField key={s} state={s} defaultValue={['default', 'hover', 'focus'].includes(s) ? '' : '2'} aria-label={s} readOnly />
            ))}
          </Row>
          <Row label="Verification Code Input">
            <div className="flex flex-col gap-6">
              <VerificationCodeInput hint="This is a hint text." />
              <VerificationCodeInput defaultValue="123456" hint="This is a hint text." />
              <VerificationCodeInput defaultValue="123456" disabled hint="This is a hint text." />
              <VerificationCodeInput defaultValue="123456" successMessage="This is a success message." />
              <VerificationCodeInput defaultValue="123456" errorMessage="Error message" />
            </div>
          </Row>
          <Row label="Numeric Field">
            <NumericField label="Quantity" />
            <NumericField label="Guests" defaultValue={1} />
          </Row>
        </Section>

        <Section id="selection" title="Selection Controls">
          <Row label="Toggle">
            <Toggle label="Text" defaultChecked />
            <Toggle label="Text" defaultChecked disabled />
            <Toggle label="Text" />
            <Toggle label="Text" disabled />
          </Row>
          <Row label="Checkbox">
            <Checkbox labelText="Checkbox" />
            <Checkbox labelText="Checkbox" defaultChecked="indeterminate" />
            <Checkbox labelText="Checkbox" disabled />
            <Checkbox labelText="Checkbox" defaultChecked />
            <Checkbox labelText="Checkbox" defaultChecked disabled />
          </Row>
          <Row label="Radio Button">
            <RadioButton name="r1" labelText="Radio Buttons" />
            <RadioButton name="r1" labelText="Radio Buttons" defaultChecked />
            <RadioButton name="r2" labelText="Radio Buttons" defaultChecked disabled />
            <RadioButton name="r3" labelText="Radio Buttons" disabled />
          </Row>
        </Section>

        <Section id="avatars" title="Avatars & upload image">
          <Row label="text">
            {(['lg', 'base', 'sm', 'xs'] as const).map(s => <Avatar key={s} size={s} name="Ahmed Khaled" />)}
          </Row>
          <Row label="icon">
            {(['lg', 'base', 'sm', 'xs'] as const).map(s => <Avatar key={s} size={s} variant="icon" />)}
          </Row>
          <Row label="Avatar Upload">
            <AvatarUpload />
            <AvatarUpload state="filled" src="https://i.pravatar.cc/200?img=12" />
            <AvatarUpload error />
          </Row>
        </Section>

        <Section id="tooltips" title="Tooltips">
          <Row label="sm">
            {(['down', 'left', 'right', 'up'] as const).map(a => <Tooltip key={a} arrow={a} content="Tooltips" />)}
          </Row>
          <Row label="lg">
            {(['up', 'right', 'left', 'down'] as const).map(a => <Tooltip key={a} arrow={a} size="lg" content="A message which appears when a cursor is positioned over an icon, image, hyperlink, or other element in a graphical user interface." />)}
          </Row>
          <Row label="on a trigger (hover or focus the button)">
            <div className="pt-12">
              <Tooltip content="Tooltips">
                <Button variant="outline" size="sm">Hover me</Button>
              </Tooltip>
            </div>
          </Row>
        </Section>

        <Section id="banners" title="Banners & Badges">
          <div className="flex flex-col gap-4">
            <Alert variant="info" title="Information" onClose={() => {}}>This is an informational alert providing helpful context to users.</Alert>
            <Alert variant="warning" title="Warning" onClose={() => {}}>Please review this information before proceeding further.</Alert>
            <Alert variant="danger" title="Error" onClose={() => {}}>Something went wrong. Please try again or contact support.</Alert>
            <Alert variant="success" title="Success" onClose={() => {}}>Your action was completed successfully. Great work!</Alert>
          </div>
          <Row label="Badge">
            {feedback.map(v => <Badge key={v} variant={v}>{{ info: 'Badge', warning: 'Warning', danger: 'Error', success: 'Success' }[v]}</Badge>)}
          </Row>
        </Section>

        <Section id="popups" title="Popups">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {(['success', 'info', 'warning', 'danger'] as const).map(v => (
              <ConfirmationPopup key={v} variant={v} title="Main Text" confirmLabel="Button text" cancelLabel="Button text" onClose={() => {}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              </ConfirmationPopup>
            ))}
          </div>
        </Section>

        <Section id="navigation" title="Pagination & Tabs">
          <Row label="Pagination / Item">
            {(['default', 'hover', 'active', 'disabled'] as const).map(s => <PaginationItem key={s} state={s}>1</PaginationItem>)}
            <PaginationItem variant="ellipsis" />
            <PaginationItem variant="prev" />
            <PaginationItem variant="prev" disabled />
            <PaginationItem variant="next" />
            <PaginationItem variant="next" disabled />
          </Row>
          <Row label="Pagination">
            <Pagination page={page} pageCount={10} onPageChange={setPage} />
          </Row>
          <Row label="Tabs / Item">
            {(['underline', 'pill'] as const).flatMap(v => (['default', 'hover', 'active', 'disabled'] as const).map(s => <TabItem key={v + s} variant={v} state={s}>Tab label</TabItem>))}
          </Row>
          <Row label="Tabs">
            <div className="flex flex-col gap-6">
              <Tabs aria-label="Report sections" tabs={tabList} value={tab} onValueChange={setTab} />
              <Tabs aria-label="Report filters" variant="pill" tabs={tabList} value={pillTab} onValueChange={setPillTab} />
            </div>
          </Row>
        </Section>

        <Section id="icons" title="Icons">
          {Object.entries(groups).map(([group, names]) => (
            <Row key={group} label={group}>
              {names.map(n => (
                <span key={n} title={n} className="inline-flex flex-col items-center gap-1 text-icon-default">
                  <Icon name={n} />
                  <span className="text-xs text-muted">{n}</span>
                </span>
              ))}
            </Row>
          ))}
          <p className="text-xs text-muted">{Object.keys(icons).length} icons in code (38 from the Icons page + 7 drawn inside components). `export` has no visible layers in Figma.</p>
        </Section>
      </main>
    </div>
  );
}
