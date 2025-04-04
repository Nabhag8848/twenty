import { Trans } from '@lingui/react/macro';
import { BaseEmail } from 'src/components/BaseEmail';
import { CallToAction } from 'src/components/CallToAction';
import { MainText } from 'src/components/MainText';
import { Title } from 'src/components/Title';
import { APP_LOCALES } from 'twenty-shared/translations';

type WarnSuspendedWorkspaceEmailProps = {
  daysSinceInactive: number;
  inactiveDaysBeforeDelete: number;
  userName: string;
  workspaceDisplayName: string | undefined;
  locale: keyof typeof APP_LOCALES;
};

export const WarnSuspendedWorkspaceEmail = ({
  daysSinceInactive,
  inactiveDaysBeforeDelete,
  userName,
  workspaceDisplayName,
  locale,
}: WarnSuspendedWorkspaceEmailProps) => {
  const daysLeft = inactiveDaysBeforeDelete - daysSinceInactive;
  const dayOrDays = daysLeft > 1 ? 'days' : 'day';
  const remainingDays = daysLeft > 0 ? `${daysLeft} ` : '';

  const helloString = userName?.length > 1 ? `Hello ${userName}` : 'Hello';

  return (
    <BaseEmail width={333} locale={locale}>
      <Title value={<Trans>Suspended Workspace </Trans>} />
      <MainText>
        {helloString},
        <br />
        <br />
        <Trans>
          It appears that your workspace <b>{workspaceDisplayName}</b> has been
          suspended for {daysSinceInactive} days.
        </Trans>
        <br />
        <br />
        <Trans>
          The workspace will be deactivated in {remainingDays} {dayOrDays}, and
          all its data will be deleted.
        </Trans>
        <br />
        <br />
        <Trans>
          If you wish to continue using Twenty, please update your subscription
          within the next {remainingDays} {dayOrDays}.
        </Trans>
      </MainText>
      <CallToAction
        href="https://app.twenty.com/settings/billing"
        value={<Trans>Update your subscription</Trans>}
      />
    </BaseEmail>
  );
};
